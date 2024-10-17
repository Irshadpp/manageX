import mongoose from "mongoose";
import { LeaveStatus } from "../../model/enum";
import { LeaveAttrs, LeaveDoc } from "../../model/leave.model";
import { Leave } from "../../model/schema/leave.schema";
import { ILeaveService } from "./leave.service.interface";
import moment from "moment";

export class LeaveService implements ILeaveService {
  async createLeave(attrs: LeaveAttrs): Promise<LeaveDoc> {
    const newLeave = Leave.build(attrs);
    const savedLeave = await newLeave.save();

    const formattedLeave = {
      ...savedLeave.toObject(),
      startDate: moment(savedLeave.startDate).format("YYYY-MM-DD"),
      endDate: moment(savedLeave.endDate).format("YYYY-MM-DD"),
    };

    return formattedLeave as LeaveDoc;
  }

  async updateLeaveStatus(
    leaveId: string,
    status: LeaveStatus
  ): Promise<LeaveDoc | null> {
    return await Leave.findByIdAndUpdate(
      leaveId,
      { $set: { status } },
      { new: true }
    );
  }

  async fetchApplicationsByEmpId(employeeId: string, page: number, limit: number): Promise<any | null> {

    const skip = (page - 1) * limit;
    const totalLeaves = await Leave.countDocuments({employeeId});
    const totalPages = Math.ceil(totalLeaves / limit);

    const leaves = await Leave.aggregate([
      { $match: { employeeId: new mongoose.Types.ObjectId(employeeId) } },
      {
        $project: {
          leaveType: 1,
          startDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$startDate" },
          },
          endDate: { $dateToString: { format: "%Y-%m-%d", date: "$endDate" } },
          reason: 1,
          status: 1,
        },
      },
      {$skip: skip},
      {$limit: limit}
    ]);
    return {
      leaveApplications: leaves,
      totalPages
    };
  }

  async fetchApplicationsByOrg(organizationId: string): Promise<any | null> {
    const leaves = await Leave.aggregate([
      {
        $match: { organizationId: new mongoose.Types.ObjectId(organizationId) },
      },
      {
        $project: {
          createdAt: 1,
          leaveType: 1,
          startDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$startDate" },
          },
          endDate: { $dateToString: { format: "%Y-%m-%d", date: "$endDate" } },
          reason: 1,
          status: 1,
        },
      },
    ]);
    return leaves;
  }
}
