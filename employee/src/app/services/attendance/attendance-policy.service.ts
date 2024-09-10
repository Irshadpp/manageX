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
    return await AttendancePolicy.findById(orgId);
  }
  async updateAttendancePolicy(
    orgId: string,
    attrs: AttendancePolicyAttrs
  ): Promise<AttendacePolicyDoc | null> {
    return await AttendancePolicy.findByIdAndUpdate(
      orgId,
      { $set: { ...attrs } },
      { new: true }
    );
  }
}
