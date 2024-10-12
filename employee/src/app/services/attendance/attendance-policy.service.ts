import mongoose from "mongoose";
import {
  AttendacePolicyDoc,
  AttendancePolicyAttrs,
} from "../../model/attendance-policy.model";
import { AttendancePolicy } from "../../model/schema/attendance-policy.schema";
import { IAttendancePolicyService } from "./attendance-policy.interface";

export class AttendancePolicyService implements IAttendancePolicyService {
    async createAttendancePolicy(attrs: AttendancePolicyAttrs){
        const newAttendancePolicy = AttendancePolicy.build(attrs);
        return await newAttendancePolicy.save();
    }
  async getAttendancePolicyByOrgId(
    orgId: string
  ): Promise<AttendacePolicyDoc | null> {
    return await AttendancePolicy.findOne({organizationId: orgId});
  }
  async updateAttendancePolicy(
    orgId: string,
    attrs: AttendancePolicyAttrs
  ): Promise<AttendacePolicyDoc | null> {
    return await AttendancePolicy.findByIdAndUpdate(
      new mongoose.Types.ObjectId(orgId),
      { $set: { ...attrs } },
      { new: true }
    );
  }
}
