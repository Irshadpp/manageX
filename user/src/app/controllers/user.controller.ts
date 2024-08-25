import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { JWTUserPayload, NotFoundError } from "@ir-managex/common";

const userService = new UserService();

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as JWTUserPayload;
    const checkUser = userService.findById(userId);
    if (!checkUser) {
      throw new NotFoundError();
    }
    const userData = req.body;
    await userService.updateUser(userId, userData);
    res
      .status(200)
      .json({ success: true, message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
