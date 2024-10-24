import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";
import { AttendanceService } from "../services/attendance/attendance.service";
import { AttendanceStatus } from "../model/enum";
import { BadRequestError, HttpStatusCode, sendResponse } from "@ir-managex/common";

const attendancePolicyService = new AttendancePolicyService()
const attendanceService = new AttendanceService();


export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
    const { type, remarks } = req.body;
    const { id, organization } = req.user!;
    const attendancePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organization);

    if (!attendancePolicy) {
        return next(new BadRequestError("Attendance policy not found"));
    }
    
    // Adjust the current time to IST (UTC+05:30)
    const currentUtcDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(currentUtcDate.getTime() + istOffset);
    const currentDateString = istDate.toISOString().split('T')[0];
    
    const existingAttendance = await attendanceService.findAttendance(id, organization, currentDateString);
    
    const [officeStartHours, officeStartMinutes] = attendancePolicy.officeStartTime.split(':').map(Number);
    const fullDayHours = attendancePolicy.fullDayThreshold;
    
    const officeStartTime = new Date();
    officeStartTime.setHours(officeStartHours, officeStartMinutes, 0, 0);
    officeStartTime.setMinutes(officeStartTime.getMinutes() - officeStartTime.getTimezoneOffset());
    
    const thresholdDate = new Date(officeStartTime);
    thresholdDate.setHours(officeStartHours + fullDayHours);
    
    if (type === "checkIn") {
        if (existingAttendance) {
            return next(new BadRequestError("Already checked in."));
        }
        
        if (istDate > thresholdDate) {
            return next(new BadRequestError("Cannot check in after the office time"));
        }
        
        const status = istDate > officeStartTime
        ? AttendanceStatus.LATE
        : AttendanceStatus.PRESENT;
        
        const attendance = await attendanceService.createAttendance({
            employeeId: id,
            organizationId: organization,
            checkIn: istDate,
            status,
            remarks,
        });
        
        return sendResponse(res, HttpStatusCode.OK, "Check-in recorded successfully", attendance);
        
    } else if (type === "checkOut") {
        if (!existingAttendance) {
            return next(new BadRequestError("No check-in record found. Please check in first."));
        }
        if (existingAttendance.checkOut) {
            return next(new BadRequestError("Already checked out. Cannot check out again."));
        }
        
        const checkOutDate = istDate;
        const workingHours = (checkOutDate.getTime() - existingAttendance.checkIn!.getTime()) / (1000 * 60 * 60);
        
        const status = workingHours < attendancePolicy.halfDayThreshold
        ? AttendanceStatus.HALFDAY
        : AttendanceStatus.PRESENT;
        
        const updatedAttendance = await attendanceService.updateAttendance(existingAttendance.id, {
            checkOut: checkOutDate,
            workingHours,
            status,
            remarks,
        });
        
        return sendResponse(res, HttpStatusCode.OK, "Check-out recorded successfully", updatedAttendance);
    }
    
    return next(new BadRequestError("Invalid type. Must be either 'checkIn' or 'checkOut'."));
};




export const getAttendanceLogs = async (req: Request, res: Response, next: NextFunction) =>{
    try {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 8;

        const {empId} = req.query;
        let employeeId;
        if(empId){ //for owner
            employeeId = req.body.employeeId
        }else{
            employeeId = req.user!.id
        }
        const {organization} = req.user!
        const attendanceData = await attendanceService.getAttendanceData(employeeId, organization, page, limit);
        sendResponse(res, HttpStatusCode.OK, "Attendance data fetched successfully", attendanceData);
    } catch (error) {
        next(error);
    }
}
