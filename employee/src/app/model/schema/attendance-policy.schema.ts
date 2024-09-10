import mongoose from "mongoose";
import {
  AttendancePolicyModel,
  AttendancePolicyAttrs,
} from "../attendance-policy.model";

const attendancePolicySchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    officeStartTime: { type: String, default: "09:00" },
    lateThreshold: { type: String, default: "09:30" },
    halfDayThreshold: { type: Number, default: 4 },
    fullDayThreshold: { type: Number, default: 8 },
    leavePolicy: {
        sickLeaves: { type: Number, default: 2 },
        casualLeaves: { type: Number, default: 2 },
        vecationLeaves: { type: Number, default: 2 },
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id, delete ret.__v;
      },
    },
  }
);

attendancePolicySchema.statics.build = (attrs: AttendancePolicyAttrs) => {
  return new AttendancePolicy(attrs);
};

const AttendancePolicy = mongoose.model<
  AttendancePolicyAttrs,
  AttendancePolicyModel
>("AttendancePolicy", attendancePolicySchema);

export { AttendancePolicy };
