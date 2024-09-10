import mongoose, { Schema } from "mongoose";
import { AttendaceStatus } from "../enum";
import { AttendanceModel, AttendanceAttrs } from "../attendance.model";

const attendanceSchema = new mongoose.Schema({
    employeeId:{
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    checkIn:{
        type: Date,
        default: null,
    },
    checkout: {
        type: Date,
        defaul: null
    },
    date: {
        type: Date,
        required: true
    },
    status:{
        type: AttendaceStatus,
        default: AttendaceStatus.PRESENT
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