import mongoose from "mongoose";
import { AttendaceStatus } from "./enum";

export interface AttendanceAttrs{
    employeeId: string;
    checkIn: Date | null;
    checkout: Date | null;
    date: Date;
    status: AttendaceStatus;
    remarks?: string;
}

export interface AttendanceDoc extends mongoose.Document{
    id: string;
    employeeId: string;
    checkIn: Date | null;
    checkout: Date | null;
    date: Date;
    status: AttendaceStatus;
    remarks?: string;
}

export interface AttendanceModel extends mongoose.Model<AttendanceDoc>{
    build(attrs: AttendanceAttrs) : AttendanceDoc;
}