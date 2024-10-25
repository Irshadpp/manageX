import mongoose from "mongoose";
import { LeaveStatus, LeaveType } from "../enum";
import { LeaveAttrs, LeaveDoc, LeaveModel } from "../leave.model";

const leaveSchema = new mongoose.Schema(
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
      },
      leaveType: {
        type: String,
        enum: LeaveType,
        required: true,
      },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      reason: { type: String },
      status: {
        type: String,
        enum: LeaveStatus,
        default: LeaveStatus.PENDING,
      },
    },
    {
      toJSON: {
        virtuals: true,
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
      timestamps: true,
    }
  );

  function addIdToAggregation(schema: mongoose.Schema) {
    schema.pre('aggregate', function () {
      this.pipeline().push({
        $addFields: { id: "$_id" },
      });
      this.pipeline().push({
        $project: { _id: 0, __v: 0 },
      });
    });
  }

  leaveSchema.plugin(addIdToAggregation);
  
  leaveSchema.statics.build = (attrs: LeaveAttrs) => {
    return new Leave(attrs);
  };
  
  const Leave = mongoose.model<LeaveDoc, LeaveModel>('Leave', leaveSchema);
  
  export { Leave };