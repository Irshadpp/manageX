import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";
import { Attendance } from "../model/schema/attendance.schema";
import { AttendanceService } from "../services/attendance/attendance.service";
import { AttendanceStatus } from "../model/enum";
import { BadRequestError } from "@ir-managex/common";

const attendancePolicyService = new AttendancePolicyService()
const attendanceService = new AttendanceService();

export const markAttendance = async (req: Request, res: Response, next: NextFunction) =>{
     const { employeeId, organizationId, checkIn, checkOut } = req.body;
    const attendancePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organizationId);
    if(!attendancePolicy){
        throw new Error("Attendance policy not not found")
    }

        const currentDate = new Date(checkIn).toISOString().split('T')[0];
        const existingAttendance = await attendanceService.findAttendance(employeeId, organizationId, currentDate)
        
        if (existingAttendance) {
          if (checkOut) {
            const checkOutDate = new Date(checkOut);
            const workingHours = (checkOutDate.getTime() - existingAttendance.checkIn!.getTime()) / (1000 * 60 * 60);
    
            let status = AttendanceStatus.PRESENT;
    
            if (workingHours < attendancePolicy.halfDayThreshold) {
              status = AttendanceStatus.HALFDAY;
            } else if (workingHours >= attendancePolicy.fullDayThreshold) {
              status = AttendanceStatus.PRESENT;
            }
    
            const attendanceData = {
                workingHours,
                checkOut,
                status,
            }
            const updatedAttendance = await attendanceService.updateAttendance(existingAttendance.id, attendanceData)
    
            return updatedAttendance;
          } else {
            throw new BadRequestError("Cannot check in again without checking out. Please check out first.");
          }
        } else {
          if (checkOut) {
            throw new BadRequestError("Please checkin first");
          }
    
          const checkInDate = new Date(checkIn);
          let status = AttendanceStatus.PRESENT;

          const [officeStartHours, officeStartMinutes] = attendancePolicy.officeStartTime.split(':').map(Number);
          const [lateHours, lateMinutes] = attendancePolicy.lateThreshold.split(':').map(Number);
      
          const officeStartDate = new Date();
          officeStartDate.setHours(officeStartHours, officeStartMinutes, 0, 0); 
      
          const lateDate = new Date();
          lateDate.setHours(lateHours, lateMinutes, 0, 0); 
      
          if (checkInDate.getTime() > officeStartDate.getTime() && checkInDate.getTime() > lateDate.getTime()) {
              status = AttendanceStatus.LATE;
          }
          
          await attendanceService.createAttendance({
            employeeId,
            organizationId,
            checkIn:checkInDate,
            status
          })
    
         res.status(200).json({
            success: true,
            message: "Attendance updated successfully",
         });
        }
}

export const getAttendanceLogs = async (req: Request, res: Response, next: NextFunction) =>{

}