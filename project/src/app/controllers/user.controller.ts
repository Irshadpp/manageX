import { BadRequestError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";

const userService = new UserService();

export const fetchMembers = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const orgId = req.user?.organization;
        const {role} = req.query;
        if(!orgId || !role) throw new BadRequestError("Invalid user credentials");
        const members = await userService.fetchEmployeesByOrgId(orgId, role as string);
        res.status(200).json({
            success: true,
            message: "Fetched members successfully",
            data: members
        });
    } catch (error) {
        next(error)
    }
}