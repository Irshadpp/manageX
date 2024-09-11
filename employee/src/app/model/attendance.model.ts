import mongoose from "mongoose";
import { AttendanceStatus } from "./enum";

export interface AttendanceAttrs{
    employeeId?: string;
    organizationId?: string;
    checkIn?: Date | null;
    checkOut?: Date | null;
    status: AttendanceStatus;
    workingHours?: number;
    remarks?: string;
}

export interface AttendanceDoc extends mongoose.Document{
    id: string;
    employeeId: string;
    organizationId: string; 
    checkIn: Date | null;
    checkOut: Date | null;
    status: AttendanceStatus;
    workingHours?: number;
    remarks?: string;
}

export interface AttendanceModel extends mongoose.Model<AttendanceDoc>{
    build(attrs: AttendanceAttrs) : AttendanceDoc;
}