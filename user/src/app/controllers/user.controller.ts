import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { BadRequestError } from "@ir-managex/common";

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { email } = req.body;
        const existingUser = await userService.findByEmail(email);
      
        if (existingUser) {
          throw new BadRequestError("Email is already exists");
        }
      
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        next(error)
    }
};
