import mongoose from "mongoose";
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

    async fetchApplicationsByEmpId(employeeId: string): Promise<any | null> {
        const leaves = await Leave.aggregate([
            { $match: { employeeId: new mongoose.Types.ObjectId(employeeId)} },
            { 
              $project: {
                leaveType: 1,
                startDate: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
                endDate: { $dateToString: { format: "%Y-%m-%d", date: "$endDate" } },
                reason: 1,
                status: 1
              }
            }
          ]);
        return leaves
    }

    async fetchApplicationsByOrg(organizationId: string): Promise<any | null> {
        const leaves = await Leave.aggregate([
            { $match: { organizationId: new mongoose.Types.ObjectId(organizationId)} },
            { 
              $project: {
                createdAt: 1,
                leaveType: 1,
                startDate: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
                endDate: { $dateToString: { format: "%Y-%m-%d", date: "$endDate" } },
                reason: 1,
                status: 1
              }
            }
          ]);
        return leaves
    }
}