import { LeaveStatus } from "../../model/enum";
import { LeaveAttrs, LeaveDoc } from "../../model/leave.model";

export interface ILeaveService{
    createLeave(attrs: LeaveAttrs): Promise<LeaveDoc>;
    updateLeaveStatus(leaveId: string, status: LeaveStatus): Promise<LeaveDoc | null>
    fetchApplicationsByEmpId(employeeId: string):Promise<any | null>
    fetchApplicationsByOrg(organizationId: string):Promise<any | null>
}