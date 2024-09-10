import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";
import { BadRequestError } from "@ir-managex/common";
import { LeaveService } from "../services/leave/leave.service";

const attendancePolicyService = new AttendancePolicyService();
const leaveService = new LeaveService();

export const applyLeave = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {organizationId, leaveType, startDate, endDate} = req.body;

    const policy = await attendancePolicyService.getAttendancePolicyByOrgId(organizationId);
    if(!policy){
        throw new Error("Attendance policy not found");
    }

    const leaveBalance = (policy.leavePolicy as any)[`${leaveType}Leaves`];
    const requestedLeaveDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    
    if(requestedLeaveDays > leaveBalance){
        throw new BadRequestError(`Insufficient ${leaveType} leave balance`)
    }

    const leave = await leaveService.createLeave(req.body);

    res.status(201).json({
        success: true,
        message: "Leave applied successfully",
        data: leave
    })
    } catch (error) {
        next(error)
    }
}

export const updateLeaveStatus = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {leaveId} = req.params;
        const {status} = req.body;
        
        if(leaveId || status){
            throw new BadRequestError("status or leaveId is missing");
        }

        const updatedLeave = leaveService.updateLeaveStatus(leaveId, status);
        res.status(200).send({
            success: true,
            message: "Leave status updated successfully",
            data: updatedLeave
        });
    } catch (error) {
        next(error)
    }
}