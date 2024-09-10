import { LeaveStatus } from "../../model/enum";
import { LeaveAttrs, LeaveDoc } from "../../model/leave.model";
import { Leave } from "../../model/schema/leave.schema";
import { ILeaveService } from "./leave.service.interface";

export class LeaveService implements ILeaveService{
    async createLeave(attrs: LeaveAttrs): Promise<LeaveDoc> {
        const newLeave = Leave.build(attrs);
        return await newLeave.save();
    }

    async updateLeaveStatus(leaveId: string, status: LeaveStatus): Promise<LeaveDoc | null> {
        return await Leave.findById(leaveId,
            {$set: {status}},
            {new: true}
        )
    }
}