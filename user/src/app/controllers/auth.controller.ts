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
  setCookie,
  ForbiddenError,
} from "@ir-managex/common";
import { UserAttrs } from "../model/user.model";
import { UserService } from "../services/user/user.service";
import { OrgService } from "../services/organization/org.service";
import Password from "../utils/password";
import { checkGoogleAuthUser } from "../utils/check-googleAuth-user";

const userService = new UserService();
const orgService = new OrgService();

const handleVerificationEmail = async (id: string, email: string) => {
  const token = generateEmailToken(id);
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
      id: user.id,
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

    setCookie(res, 'accessToken', accessToken, {maxAge: 30 * 60 * 1000});
    setCookie(res, 'refreshToken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000})

    res.status(200).json({
      success: true,
      user,
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
    if (!user) {
      throw new BadRequestError("Invalid email or password!");
    }
    if(!user.isActive){
      throw new BadRequestError("Your account has been blocked. Please contact support.")
    }
    const matchPassword = await Password.compare(user.password, password);
    if (!matchPassword) {
      throw new BadRequestError("Invalid email or password!");
    }

    const payload: JWTUserPayload = {
      id: user.id,
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

    setCookie(res, 'accessToken', accessToken, {maxAge: 30 * 60 * 1000});
    setCookie(res, 'refreshToken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000})

    res.status(200).json({
      success: true,
      user: payload,
      accessToken,
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
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken,"=================================");
    if(!refreshToken) throw new NotAuthorizedError();

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const user = verifyJwt(refreshToken, refreshSecret!) as JWTUserPayload;
    console.log(user);
    if (!user) throw new ForbiddenError();
    const payload: JWTUserPayload = {
      id: user.id,
      role: user.role,
      organization: user.organization,
    };
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const newAccessToken = generateJwtAccessToken(payload, accessSecret!);

    setCookie(res, 'accessToken', newAccessToken, {maxAge: 30 * 60 * 1000});

    res.json({accessToken: newAccessToken});
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
        id: existingUser.id,
        role: existingUser.role,
        organization: existingUser.organizationId,
      };
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
        id: user.id,
        role: user.role,
        organization: org.id,
      };
    }
    accessToken = generateJwtAccessToken(payload, accessSecret!);
    refreshToken = generateJwtRefreshToken(payload, refreshSecret!);

    setCookie(res, 'accessToken', accessToken, {maxAge: 30 * 60 * 1000});
    setCookie(res, 'refreshToken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000})


    res.status(200).json({
      success: true,
      user: payload,
      accessToken,
      message: "google signin successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const checkUser = async (req: Request, res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const {id} = req.user
    const user = await userService.getUserById(id);
    const accessToken = req.cookies.accessToken
    res
      .status(200)
      .json({ success: true, user, accessToken , message: "Fetched user status successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req:Request, res:Response, next:NextFunction) =>{
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).send({ success: true, message: "Logged out successfully"});
}
