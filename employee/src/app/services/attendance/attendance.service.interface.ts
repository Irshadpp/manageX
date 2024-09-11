import { AttendanceAttrs, AttendanceDoc } from "../../model/attendance.model";

export interface IAttendanceService{
    findAttendance(employeeId: string, organizationId: string, currentDate: string): Promise<AttendanceDoc | null>
    createAttendance(attrs: AttendanceAttrs): Promise<AttendanceAttrs>
    updateAttendance(id: string,attrs: AttendanceAttrs): Promise<AttendanceDoc | null>
    getAttendanceData(employeeId: string, organizationId: string): Promise<any>
}