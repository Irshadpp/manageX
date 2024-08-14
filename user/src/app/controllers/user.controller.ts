import { Request, Response } from "express";
import { UserService } from "../services/user/user.service";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) =>{
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}