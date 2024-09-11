import mongoose, { Schema } from "mongoose";
import { AttendanceStatus } from "../enum";
import { AttendanceModel, AttendanceAttrs } from "../attendance.model";

const attendanceSchema = new mongoose.Schema({
    employeeId:{
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    organizationId:{
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    checkIn:{
        type: Date,
        default: null,
    },
    checkOut: {
        type: Date,
        defaul: null
    },
    status:{
        type: String,
        enum: AttendanceStatus,
        default: AttendanceStatus.PRESENT
    },
    remarks: {
        type: String
    }
},{
    toJSON: {
        timestamps: true,
        virtuals: true,
        transform(doc, ret){
            ret.id = ret._id,
            delete ret._id,
            delete ret.__v
        }
    }
});

attendanceSchema.statics.build = (attrs: AttendanceAttrs) =>{
    return new Attendance(attrs)
}

const Attendance = mongoose.model<AttendanceAttrs, AttendanceModel>("Attendance", attendanceSchema);

export {Attendance}