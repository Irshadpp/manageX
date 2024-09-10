import { AttendanceAttrs, AttendanceDoc } from "../../model/attendance.model";
import { Attendance } from "../../model/schema/attendance.schema";
import { IAttendanceService } from "./attendance.service.interface";

export class AttendanceService implements IAttendanceService{
    async findAttendance(employeeId: string, organizationId: string, currentDate: string): Promise<AttendanceDoc | null> {
        return await Attendance.findOne({
            employeeId,
            organizationId,
            checkIn: { $gte: new Date(currentDate) },
            checkOut: { $exists: false },
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
}