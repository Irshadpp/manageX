import mongoose from "mongoose";
import { LeaveStatus, LeaveType } from "./enum";

export interface LeaveAttrs {
    employeeId: string;
    organizationId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    reason?: string;
    status: LeaveStatus;
  }
  
export interface LeaveDoc extends mongoose.Document {
    id: string;
    employeeId: string;
    organizationId: string;
    leaveType: LeaveType;
    startDate: Date;
    endDate: Date;
    reason?: string;
    status: LeaveStatus;
  }
  
export interface LeaveModel extends mongoose.Model<LeaveDoc> {
    build(attrs: LeaveAttrs): LeaveDoc;
  }