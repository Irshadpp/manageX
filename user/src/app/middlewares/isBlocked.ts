import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { BadRequestError } from "@ir-managex/common";

const userService = new UserService();

export const isBlock = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = await userService.findById(req.user?.id!);
        if(!user?.isActive){
            next(new BadRequestError("Account has been blocked"));
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}