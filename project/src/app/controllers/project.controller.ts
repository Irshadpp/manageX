import { NextFunction, Request, Response } from "express";

export const createProject = (req: Request, res: Response, next: NextFunction) =>{
    res.status(201).json({success: true})
}