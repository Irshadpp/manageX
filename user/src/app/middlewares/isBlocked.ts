import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { BadRequestError } from "@ir-managex/common";

const userService = new UserService();

export const isBlock = async (req: Request, res: Response, next: NextFunction) =>{
    console.log("-03490-129-3490-214-2910-490-12390-90-490-")
    try {
        const user = await userService.findById(req.user?.id!);
        console.log(user)
        if(!user?.isActive){
            next(new BadRequestError("Account has been blocked"));
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}