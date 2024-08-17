import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { BadRequestError } from "@ir-managex/common";
import {
  generateEmailToken,
  verifyEamilToken,
} from "../utils/jwt/email-varification.jwt";
import { sendVarificationEmail } from "../utils/node-mailer/send-verification-email";

const userService = new UserService();

const handleVerificationEmail = async (userId: string, email: string) =>{
    const token = generateEmailToken(userId);
    await sendVarificationEmail(email, token);
}

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

    await handleVerificationEmail(user.id, user.email);

    res.status(201).send(user);
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
    await userService.verifyUserEmail(id);
    res.send("Email verified successfully");
  } catch (error) {
    next(error);
  }
};
