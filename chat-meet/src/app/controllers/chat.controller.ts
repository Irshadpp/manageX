import { NextFunction, Request, Response } from "express";


export const getChats = (req: Request, res: Response, next: NextFunction) =>{
    try {
        const chats = "chats"
        res.status(200).send({success: true, message: "chats fetched successfully", data: chats})
    } catch (error) {
        next(error)
    }
}