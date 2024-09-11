import { NextFunction, Request, Response } from "express";
import { AttendancePolicyService } from "../services/attendance/attendance-policy.service";
import { Attendance } from "../model/schema/attendance.schema";
import { AttendanceService } from "../services/attendance/attendance.service";
import { AttendanceStatus } from "../model/enum";
import { BadRequestError } from "@ir-managex/common";

const attendancePolicyService = new AttendancePolicyService()
const attendanceService = new AttendanceService();


// export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
//     const { type, remarks } = req.body;
//     const { id, organization } = req.user!;
//     const attendancePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organization);
    
//     if (!attendancePolicy) {
//         return next(new Error("Attendance policy not found"));
//     }
    
//      const currentUtcDate = new Date();
    // const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    // const istDate = new Date(currentUtcDate.getTime() + istOffset);
    // const currentDateString = istDate.toISOString().split('T')[0];
//     const existingAttendance = await attendanceService.findAttendance(id, organization, currentDateString);
    
//     const [officeStartHours, officeStartMinutes] = attendancePolicy.officeStartTime.split(':').map(Number);
//     const fullDayHours = attendancePolicy.fullDayThreshold
    
//     const officeStartTime = new Date();
//     officeStartTime.setHours(officeStartHours, officeStartMinutes, 0, 0);
//     officeStartTime.setMinutes(officeStartTime.getMinutes() - officeStartTime.getTimezoneOffset());
    
//     const thresholdDate = new Date(officeStartTime);
//     thresholdDate.setHours(officeStartHours + fullDayHours);

//     if (type === "checkIn") {
//         if (existingAttendance) {
//             return next(new BadRequestError("Already checked in."));
//         }
        
//         if (localDate > thresholdDate) {
//             return next(new BadRequestError("Cannot check in after the office time"));
//         }
        
//         const status = localDate > officeStartTime
//         ? AttendanceStatus.LATE
//         : AttendanceStatus.PRESENT;
        
//         await attendanceService.createAttendance({
//             employeeId: id,
//             organizationId: organization,
//             checkIn: localDate,
//             status,
//             remarks,
//         });
        
//         return res.status(200).json({ success: true, message: "Check-in recorded successfully" });
        
//     } else if (type === "checkOut") {
//         if (!existingAttendance) {
//             return next(new BadRequestError("No check-in record found. Please check in first."));
//         }
//         if (existingAttendance.checkOut) {
//             return next(new BadRequestError("Already checked out. Cannot check out again."));
//         }
        
//         const checkOutDate = localDate;
//         const workingHours = (checkOutDate.getTime() - existingAttendance.checkIn!.getTime()) / (1000 * 60 * 60);
        
//         const status = workingHours < attendancePolicy.halfDayThreshold
//         ? AttendanceStatus.HALFDAY
//         : AttendanceStatus.PRESENT;
        
//         const updatedAttendance = await attendanceService.updateAttendance(existingAttendance.id, {
//             checkOut: checkOutDate,
//             workingHours,
//             status,
//             remarks,
//         });
        
//         return res.status(200).json({ success: true, message: "Check-out recorded successfully", updatedAttendance });
//     }
    
//     return next(new BadRequestError("Invalid type. Must be either 'checkIn' or 'checkOut'."));
// };



export const getAttendanceLogs = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {owner} = req.query;
        let employeeId;
        if(owner){
            employeeId = req.body.employeeId
        }else{
            employeeId = req.user!.id
        }
        const {organization} = req.user!
        const attendanceData = await attendanceService.getAttendanceData(employeeId, organization);
        console.log(attendanceData, "-=--===========")
        res.status(200).json({
            success:true,
            message:"Attendance data fetched successfully",
            data: attendanceData
        })
    } catch (error) {
        next(error);
    }
}



export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
    const { type, remarks } = req.body;
    const { id, organization } = req.user!;
    const attendancePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organization);

    if (!attendancePolicy) {
        return next(new Error("Attendance policy not found"));
    }

    // Get the current time in UTC and manually adjust it to IST (UTC+05:30)
    const currentUtcDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(currentUtcDate.getTime() + istOffset);
    const currentDateString = istDate.toISOString().split('T')[0];

    const existingAttendance = await attendanceService.findAttendance(id, organization, currentDateString);

    if (type === "checkIn") {
        if (existingAttendance) {
            return next(new BadRequestError("Already checked in."));
        }

        const checkInDate = istDate;

        const [officeStartHours, officeStartMinutes] = attendancePolicy.officeStartTime.split(':').map(Number);
        const [lateHours, lateMinutes] = attendancePolicy.lateThreshold.split(':').map(Number);

        const officeStartTime = new Date();
        officeStartTime.setHours(officeStartHours, officeStartMinutes, 0, 0);

        const lateTime = new Date();
        lateTime.setHours(lateHours, lateMinutes, 0, 0);

        const status = checkInDate > officeStartTime && checkInDate > lateTime
            ? AttendanceStatus.LATE
            : AttendanceStatus.PRESENT;

        await attendanceService.createAttendance({
            employeeId: id,
            organizationId: organization,
            checkIn: checkInDate,
            status,
            remarks,
        });

        return res.status(200).json({ success: true, message: "Check-in recorded successfully" });

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

        return res.status(200).json({ success: true, message: "Check-out recorded successfully", updatedAttendance });
    }

    return next(new BadRequestError("Invalid type. Must be either 'checkIn' or 'checkOut'."));
};




        // export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
        //     const { type, remarks } = req.body;
        //     const {id, organization} = req.user!
        //     const attendancePolicy = await attendancePolicyService.getAttendancePolicyByOrgId(organization);
        
        //     if (!attendancePolicy) {
        //         return next(new Error("Attendance policy not found"));
        //     }
        
        //     const currentDate = new Date().toISOString().split('T')[0];
        //     const existingAttendance = await attendanceService.findAttendance(id, organization, currentDate);
        
        //     if (type === "checkIn") {
        //         if (existingAttendance) {
        //             return next(new BadRequestError("Already checked in."));
        //         }
        
        //         const checkInDate = new Date();
        //         const [officeStartHours, officeStartMinutes] = attendancePolicy.officeStartTime.split(':').map(Number);
        //         const [lateHours, lateMinutes] = attendancePolicy.lateThreshold.split(':').map(Number);
        
        //         const officeStartTime = new Date();
        //         officeStartTime.setHours(officeStartHours, officeStartMinutes, 0, 0);
        
        //         const lateTime = new Date();
        //         lateTime.setHours(lateHours, lateMinutes, 0, 0);
        
        //         const status = checkInDate > officeStartTime && checkInDate > lateTime
        //             ? AttendanceStatus.LATE
        //             : AttendanceStatus.PRESENT;
        
        //         await attendanceService.createAttendance({
        //             employeeId: id,
        //             organizationId: organization,
        //             checkIn: checkInDate,
        //             status,
        //             remarks,
        //         });
        
        //         return res.status(200).json({ success: true, message: "Check-in recorded successfully" });
        
        //     } else if (type === "checkOut") {
        //         if (!existingAttendance) {
        //             return next(new BadRequestError("No check-in record found. Please check in first."));
        //         }
        //         if (existingAttendance.checkOut) {
        //             return next(new BadRequestError("Already checked out. Cannot check out again."));
        //         }
        
        //         const checkOutDate = new Date();
        //         const workingHours = (checkOutDate.getTime() - existingAttendance.checkIn!.getTime()) / (1000 * 60 * 60);
        
        //         const status = workingHours < attendancePolicy.halfDayThreshold
        //             ? AttendanceStatus.HALFDAY
        //             : AttendanceStatus.PRESENT;
        
        //         const updatedAttendance = await attendanceService.updateAttendance(existingAttendance.id, {
        //             checkOut: checkOutDate,
        //             workingHours,
        //             status,
        //             remarks,
        //         });
        
        //         return res.status(200).json({ success: true, message: "Check-out recorded successfully", updatedAttendance });
        //     }
        
        //     return next(new BadRequestError("Invalid type. Must be either 'checkIn' or 'checkOut'."));
        // };