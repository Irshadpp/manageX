import { NextFunction, Request, Response } from "express";
import { rooms } from "../..";
import twilio from 'twilio';
import { BadRequestError, CommonMessages, HttpStatusCode, sendResponse } from "@ir-managex/common";

export const checkRoomExists = (req: Request, res: Response, next: NextFunction): Response | void =>{
    const { roomId } = req.params;

    console.log(rooms)
    const room = rooms.find((r: any) => r.id === roomId);
    if (!room) {
        throw new BadRequestError("Meeting is not found, please check your meeting id.")
    }
    if (room.connectedUsers.length > 3) {
        throw new BadRequestError("Meeting is full, try again later.")
    }

    return res.status(200).send({ success: true });
}

export const getTurnCredentials = (req: Request, res: Response, next: NextFunction) =>{
    const client = twilio(process.env.ACCOUNT_SID , process.env.AUTH_TOKEN);
    
    try {
        client.tokens.create().then(token => {
            sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, { token });
        });

    } catch (error) {
        console.log("error occured in fetching turn credentials", error);
        next(error);
    }
}
