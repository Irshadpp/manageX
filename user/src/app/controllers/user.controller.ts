import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { BadRequestError, generateJwtAccessToken, generateJwtRefreshToken, JWTUserPayload, NotFoundError } from "@ir-managex/common";
import {
  generateEmailToken,
  verifyEamilToken,
} from "../utils/jwt/email-varification.jwt";
import { sendVarificationEmail } from "../utils/node-mailer/send-verification-email";
import { OrgService } from "../services/organization/org.service";
import { UserAttrs } from "../model/user.model";

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
        return res.status(202).send(existingUser);
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

    if(!user){
      throw new NotFoundError();
    }

    const payload : JWTUserPayload = {
      user: user.id,
      role: user.role,
      organization: user.organizationId
    }

    const accessToken = generateJwtAccessToken(payload, process.env.JWT_ACCESS_SECRET!);
    const refreshToken = generateJwtRefreshToken(payload, process.env.JWT_REFRESH_SECRET!);

    res.status(200).json({ success: true, user, accessToken, refreshToken, message: "Signup successfull"});
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const data = req.body;
  } catch (error) {
    
  }
}
