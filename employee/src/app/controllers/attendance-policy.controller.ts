import { BadRequestError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";

const attendancePolicyService = new AttendancePolicyService()

export const fetchAttendancePolicy = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {organizationId} = req.query;
        if(!organizationId){
            throw new BadRequestError("Organization Id is required")
        }
        const attendacePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organizationId as string);
        res.status(200).json({
            success: true,
            message: "Attendance policy fetched successfully",
            data: attendacePolicy
        });
    } catch (error) {
        console.log(error);
        next(error)
    }   
}

export const updateAttendancePolicy = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {organizationId} = req.query;
        if(!organizationId){
            throw new BadRequestError("Organization Id is required")
        }
        const newAttendancePolicy = await attendancePolicyService.updateAttendancePolicy(organizationId as string, req.body);
        res.status(200).json({
            success: true,
            message: "Attendance policy updated successfully",
            data: newAttendancePolicy
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}