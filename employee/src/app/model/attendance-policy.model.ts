import mongoose from "mongoose";
import { AttendaceStatus } from "./enum";

export interface AttendancePolicyAttrs{
  organizationId: string;
    officeStartTime: string;
    lateThreshold: string;
    fullDayThreshold: number;
    leavePolicy: {
    vecationLeaves: number,    
    sickLeaves: number,   
    casualLeaves: number,    
  }
}

export interface AttendacePolicyDoc extends mongoose.Document{
    id: string;
    organizationId: string;
    officeStartTime: string;
    lateThreshold: string;
    fullDayThreshold: number;
    leavePolicy: {
    vecationLeaves: number,    
    sickLeaves: number,          
    casualLeaves: number,        
  }
}

export interface AttendancePolicyModel extends mongoose.Model<AttendacePolicyDoc>{
    build(attrs: AttendancePolicyAttrs) : AttendacePolicyDoc;
}