import mongoose from "mongoose";
import { AttendanceAttrs, AttendanceDoc } from "../../model/attendance.model";
import { Attendance } from "../../model/schema/attendance.schema";
import { IAttendanceService } from "./attendance.service.interface";
import { convertTo12HourFormat } from "../../utils/functions/format-time";

export class AttendanceService implements IAttendanceService {
  async findAttendance(
    employeeId: string,
    organizationId: string,
    currentDate: string
  ): Promise<AttendanceDoc | null> {
    return await Attendance.findOne({
      employeeId,
      organizationId,
      checkIn: { $gte: new Date(currentDate) },
    });
  }
  async createAttendance(attrs: AttendanceAttrs): Promise<AttendanceAttrs> {
    const newAttendance = await Attendance.build(attrs).save();
    const formattedAttendance = await Attendance.aggregate([
      { $match: { _id: newAttendance._id } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$checkIn" } },
          checkIn: { $dateToString: { format: "%H:%M", date: "$checkIn" } },
          status: 1,
          remarks: 1,
        },
      },
    ]);

    return {
      ...formattedAttendance[0],
      checkIn: convertTo12HourFormat(formattedAttendance[0].checkIn),
      checkOut: "",
    };
  }
  async updateAttendance(
    id: string,
    attrs: AttendanceAttrs
  ): Promise<AttendanceDoc | null> {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { $set: { ...attrs } },
      { new: true }
    );

    if (!updatedAttendance) {
      return null;
    }

    const formattedAttendance = await Attendance.aggregate([
      { $match: { _id: updatedAttendance._id } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$checkIn" } },
          checkIn: { $dateToString: { format: "%H:%M", date: "$checkIn" } },
          checkOut: { $dateToString: { format: "%H:%M", date: "$checkOut" } },
          status: 1,
          remarks: 1,
        },
      },
    ]);

    return {
      ...formattedAttendance[0],
      checkIn: convertTo12HourFormat(formattedAttendance[0].checkIn),
      checkOut: convertTo12HourFormat(formattedAttendance[0].checkOut),
    };
  }

  async getAttendanceData(
    employeeId: string,
    organizationId: string,
    page: number,
    limit: number
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const totalAttendance = await Attendance.countDocuments({
      employeeId: new mongoose.Types.ObjectId(employeeId),
      organizationId: new mongoose.Types.ObjectId(organizationId),
    });

    const totalPages = Math.ceil(totalAttendance / limit);

    const attendanceData = await Attendance.aggregate([
      {
        $match: {
          employeeId: new mongoose.Types.ObjectId(employeeId),
          organizationId: new mongoose.Types.ObjectId(organizationId),
        },
      },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$checkIn" } },
          checkIn: {
            $dateToString: {
              format: "%H:%M",
              date: "$checkIn",
            },
          },
          checkOut: {
            $cond: {
              if: { $ne: ["$checkOut", null] },
              then: { $dateToString: { format: "%H:%M", date: "$checkOut" } },
              else: "",
            },
          },
          status: 1,
          remarks: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const formattedData = attendanceData.map((record) => ({
      ...record,
      checkIn: convertTo12HourFormat(record.checkIn),
      checkOut: record.checkOut ? convertTo12HourFormat(record.checkOut) : "",
    }));
    return {
      attendaceLogs: formattedData,
      totalPages,
    };
  }
}
