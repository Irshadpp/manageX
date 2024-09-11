import mongoose from "mongoose";
import { AttendanceAttrs, AttendanceDoc } from "../../model/attendance.model";
import { Attendance } from "../../model/schema/attendance.schema";
import { IAttendanceService } from "./attendance.service.interface";
import { convertTo12HourFormat } from "../../utils/functions/format-time";

export class AttendanceService implements IAttendanceService{
    async findAttendance(employeeId: string, organizationId: string, currentDate: string): Promise<AttendanceDoc | null> {
        return await Attendance.findOne({
            employeeId,
            organizationId,
            checkIn: { $gte: new Date(currentDate) },
          })
    }
    async createAttendance(attrs: AttendanceAttrs): Promise<AttendanceAttrs> {
        const newAttendance = Attendance.build(attrs)
        return await newAttendance.save();
    }
    async updateAttendance(id: string, attrs: AttendanceAttrs): Promise<AttendanceDoc | null> {
        return await Attendance.findByIdAndUpdate(id,
            {$set: {...attrs}},
            {new: true}
        )
    }

    async getAttendanceData(employeeId: string, organizationId: string): Promise<any> {
        const attendanceData =  await Attendance.aggregate([
            {
                $match: {
                    employeeId: new mongoose.Types.ObjectId(employeeId),
                    organizationId: new mongoose.Types.ObjectId(organizationId),
                    checkOut: {$exists: true}
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$checkIn" } },
                    checkIn: {
                        $dateToString: {
                            format: "%H:%M", // 24-hour format
                            date: "$checkIn"
                        }
                    },
                    checkOut: {
                        $dateToString: {
                            format: "%H:%M",
                            date: "$checkOut"
                        }
                    },
                    status: 1,
                    remarks: 1
                }
            }
        ]);
       return attendanceData.map(record => ({
        ...record,
        checkIn: convertTo12HourFormat(record.checkIn),
        checkOut: convertTo12HourFormat(record.checkOut),
    }))
    }
}