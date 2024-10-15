import { BadRequestError, HttpStatusCode, sendResponse } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";

const attendancePolicyService = new AttendancePolicyService()

export const fetchAttendancePolicy = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {organizationId} = req.params;
        console.log("organizaationid=======>", organizationId)
        if(!organizationId){
            throw new BadRequestError("Organization Id is required")
        }
        const attendacePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organizationId as string);
        sendResponse(res, HttpStatusCode.OK, "Attendance policy fetched successfully", attendacePolicy );
    } catch (error) {
        console.log(error);
        next(error)
    }   
}

export const updateAttendancePolicy = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {organizationId} = req.params;
        if(!organizationId){
            throw new BadRequestError("Organization Id is required")
        }
        const newAttendancePolicy = await attendancePolicyService.updateAttendancePolicy(organizationId as string, req.body);
        sendResponse(res, HttpStatusCode.OK, "Attendance policy updated successfully", newAttendancePolicy );
    } catch (error) {
        console.log(error);
        next(error);
    }
}