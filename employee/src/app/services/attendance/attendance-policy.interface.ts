import { AttendacePolicyDoc, AttendancePolicyAttrs } from "../../model/attendance-policy.model";

export interface IAttendancePolicyService{
    getAttendancePolicyByOrgId(orgId: string): Promise<AttendacePolicyDoc | null>;
    updateAttendancePolicy(orgId: string, attrs: AttendancePolicyAttrs): Promise<AttendacePolicyDoc | null>
}