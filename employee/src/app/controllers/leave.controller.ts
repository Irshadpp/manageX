import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";
import { BadRequestError } from "@ir-managex/common";
import { LeaveService } from "../services/leave/leave.service";
import { LeaveAttrs } from "../model/leave.model";

const attendancePolicyService = new AttendancePolicyService();
const leaveService = new LeaveService();

export const applyLeave = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const { leaveType, startDate, endDate, reason} = req.body;
        const {id, organization} = req.user!

    const policy = await attendancePolicyService.getAttendancePolicyByOrgId(organization);
    if(!policy){
        throw new Error("Attendance policy not found");
    }

    const leaveBalance = (policy.leavePolicy as any)[`${leaveType}Leaves`];
    const requestedLeaveDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
    
    if(requestedLeaveDays > leaveBalance){
        throw new BadRequestError(`Insufficient ${leaveType} leave balance`)
    }

    const leave = await leaveService.createLeave({
        startDate,
        endDate,
        leaveType,
        reason,
        employeeId: id,
        organizationId: organization
    } as LeaveAttrs);

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
        console.log(req.body, leaveId);
        if(!leaveId || !status){
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

export const fetchLeaveApplicatons = async (req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.user!
    const applications = await leaveService.fetchApplicationsByEmpId(id);
    res.status(200).send({
        success: true,
        message: "Leave data fethed successfully",
        data: applications
    })
}

export const fetchLeaveApplicatonsForOwner = async (req: Request, res: Response, next: NextFunction) =>{
    const {organization} = req.user!
    const applications = await leaveService.fetchApplicationsByOrg(organization);
    res.status(200).send({
        success: true,
        message: "Leave applications fethed successfully",
        data: applications
    })
}