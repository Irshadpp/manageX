import { NextFunction, Request, Response } from "express";
import {
  generateEmailToken,
  verifyEamilToken,
} from "../utils/jwt/email-varification.jwt";
import { sendVarificationEmail } from "../utils/node-mailer/send-verification-email";
import {
  BadRequestError,
  generateJwtAccessToken,
  generateJwtRefreshToken,
  JWTUserPayload,
  NotFoundError,
  NotAuthorizedError,
  verifyJwt,
} from "@ir-managex/common";
import { UserAttrs } from "../model/user.model";
import { UserService } from "../services/user/user.service";
import { OrgService } from "../services/organization/org.service";
import Password from "../utils/password";
import getRefreshToken from "../utils/jwt/get-refresh-token";
import { GoogleTokenInfo } from "./types/google-token.type";
import axios from "axios";
import { checkGoogleAuthUser } from "../utils/check-googleAuth-user";

const userService = new UserService();
const orgService = new OrgService();

const handleVerificationEmail = async (userId: string, email: string) => {
  const token = generateEmailToken(userId);
  await sendVarificationEmail(email, token);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await userService.findByEmail(email);

    if (existingUser) {
      if (!existingUser.isEmailVerified) {
        await handleVerificationEmail(existingUser.id, existingUser.email);
        return res.status(202).send({ success: true, ...existingUser });
      }
      throw new BadRequestError("Email is already exists");
    }

    const user = await userService.createUser(req.body);
    const org = await orgService.createOrg({ admin: user.id });
    const organization = { organizationId: org.id } as UserAttrs;
    await userService.updateUser(user.id, organization);

    await handleVerificationEmail(user.id, user.email);

    res.status(201).send({ success: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new BadRequestError("Token is missing");
    }
    const { id } = verifyEamilToken(token as string);

    const user = await userService.verifyUserEmail(id);

    if (!user) {
      throw new NotFoundError();
    }

    const payload: JWTUserPayload = {
      userId: user.id,
      role: user.role,
      organization: user.organizationId,
    };

    const accessToken = generateJwtAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET!
    );
    const refreshToken = generateJwtRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET!
    );

    res.status(200).json({
      success: true,
      user,
      accessToken,
      refreshToken,
      message: "Signup successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    console.log(user);
    if (!user) {
      throw new BadRequestError("Invalid email or password!");
    }
    const matchPassword = await Password.compare(user.password, password);
    if (!matchPassword) {
      throw new BadRequestError("Invalid email or password!");
    }

    const payload: JWTUserPayload = {
      userId: user.id,
      role: user.role,
      organization: user.organizationId,
    };

    const accessToken = generateJwtAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET!
    );
    const refreshToken = generateJwtRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET!
    );
    res.status(200).json({
      success: true,
      user: payload,
      accessToken,
      refreshToken,
      message: `${user.role} Login successfull`,
    });
  } catch (error) {
    next(error);
  }
};

export const newToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("--------------------new token");
    const refreshToken = getRefreshToken(req);
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const user = verifyJwt(refreshToken, refreshSecret!) as JWTUserPayload;
    if (!user) {
      throw new NotAuthorizedError();
    }
    const payload: JWTUserPayload = {
      userId: user.userId,
      role: user.role,
      organization: user.organization,
    };
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const newAccessToken = generateJwtAccessToken(payload, accessSecret!);
    const newRefreshToken = generateJwtRefreshToken(payload, refreshSecret!);

    res.status(200).json({
      user: payload,
      accesToken: newAccessToken,
      refreshToken: newRefreshToken,
      success: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("error in new token");
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const googleResponseData = await checkGoogleAuthUser(token);

    const { email, given_name, family_name, name, picture } =
      googleResponseData;

    const existingUser = await userService.findByEmail(email);
    let payload: JWTUserPayload;
    let accessToken: string;
    let refreshToken: string;
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (existingUser) {
      payload = {
        userId: existingUser.id,
        role: existingUser.role,
        organization: existingUser.organizationId,
      };
      accessToken = generateJwtAccessToken(payload, accessSecret!);
      refreshToken = generateJwtRefreshToken(payload, refreshSecret!);
    }else{
      const userData = {
        fName: given_name || name,
        lName: family_name || name,
        username: name,
        email,
        profileURL: picture,
        isEmailVerified: true
      } as UserAttrs;
      const user = await userService.createUserWithGoogle(userData);
      const org = await orgService.createOrg({ admin: user.id });
      const organization = { organizationId: org.id } as UserAttrs;
      await userService.updateUser(user.id, organization);
  
      payload = {
        userId: user.id,
        role: user.role,
        organization: org.id,
      };
      accessToken = generateJwtAccessToken(payload, accessSecret!);
      refreshToken = generateJwtRefreshToken(payload, refreshSecret!);
    }

    res.status(200).json({
      success: true,
      user: payload,
      accessToken,
      refreshToken,
      message: "google signin successfull",
    });
  } catch (error) {
    next(error);
  }
};
