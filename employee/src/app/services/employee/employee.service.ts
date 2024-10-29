import mongoose from "mongoose";
import { EmployeeAttrs, EmployeeDoc } from "../../model/employee.model";
import { Employee } from "../../model/schema/employee.schema";
import { IEmployeeService } from "./employee.service.interface";
import { convertTo12HourFormat } from "../../utils/functions/format-time";

export class EmployeeService implements IEmployeeService{
    async createEmployee(attrs: EmployeeAttrs): Promise<EmployeeDoc> {
        const newEmployee = Employee.build({...attrs});
        return await newEmployee.save();
    }
    async updateEmployee(empId: string, attrs: EmployeeAttrs): Promise<EmployeeDoc | null>{
        return await Employee.findByIdAndUpdate(empId, {...attrs}, {new: true});
    }
    async findById(id: string):Promise<EmployeeDoc | null>{
        return await Employee.findById(id);
    }
    async findByEmail(email: string): Promise<EmployeeDoc | null> {
       return await Employee.findOne({ email });
      }
    async findByUsername(username: string): Promise<EmployeeDoc | null> {
        return await Employee.findOne({username});
    }
    async findByPhone(phone: number): Promise<EmployeeDoc | null> {
        return await Employee.findOne({phone});
    }
    async findEmployeesWithOrgId(orgId: string, page: number, limit: number): Promise<any>{

        const skip = (page - 1) * limit;

        const totalEmployees = await Employee.countDocuments({
            organizationId: new mongoose.Types.ObjectId(orgId),
            hiringDate: { $exists: true },
          });
        
          const totalPages = Math.ceil(totalEmployees / limit);

        const employeeDataWithAttendance = await Employee.aggregate([
            {
                $match: {
                    organizationId: new mongoose.Types.ObjectId(orgId),
                    hiringDate: { $exists: true },
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "attendances",
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "attendanceLogs"
                }
            },
            {
                $addFields: {
                    attendanceLogs: {
                        $cond: {
                            if: { $isArray: "$attendanceLogs" },
                            then: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$attendanceLogs",
                                            as: "log",
                                            cond: { $and: [{ $ne: ["$$log.checkIn", null] }, { $ne: ["$$log.checkOut", null] }] }
                                        }
                                    },
                                    as: "log",
                                    in: {
                                        date: { $dateToString: { format: "%Y-%m-%d", date: "$$log.checkIn" } },
                                        checkIn: {
                                            $dateToString: {
                                                format: "%H:%M",
                                                date: "$$log.checkIn"
                                            }
                                        },
                                        checkOut: {
                                            $dateToString: {
                                                format: "%H:%M",
                                                date: "$$log.checkOut"
                                            }
                                        },
                                        status: "$$log.status",
                                        remarks: "$$log.remarks"
                                    }
                                }
                            },
                            else: []
                        }
                    }
                }
            },
            {
                $project: {
                    fName: 1,
                    lName: 1,
                    email: 1,
                    username: 1,
                    phone: 1,
                    role: 1,
                    hiringDate: 1,
                    salary: 1,
                    employeeType: 1,
                    profileURL: 1,
                    gender: 1,
                    isActive: 1,
                    organizationId: 1,
                    address: 1,
                    id: "$_id",
                    attendanceLogs: 1
                }
            },
            {$skip: skip},
            {$limit: limit}
        ]);
        
        const formattedEmployeeDataWithAttendance = employeeDataWithAttendance.map(employee => {
            return {
                ...employee,
                attendanceLogs: employee.attendanceLogs.map((log: any) => ({
                    ...log,
                    checkIn: log.checkIn ? convertTo12HourFormat(log.checkIn) : null,
                    checkOut: log.checkOut ? convertTo12HourFormat(log.checkOut) : null,
                }))
            };
        });
        
        return {
            employees: formattedEmployeeDataWithAttendance,
            totalPages,
          };
    }
    async countEmployees(organizationId: string): Promise<number> {
        return await Employee.find({organizationId}).countDocuments();
    }

    async terminateEmployee(employeeId: string, terminationReason: string): Promise<EmployeeDoc | null> {
        return await Employee.findByIdAndUpdate(employeeId, {isActive: false, terminationReason}, {new: true});
    }

    async fetchExEmployees(orgId: string): Promise<EmployeeDoc[]> {
        return await Employee.find({organizationId: new mongoose.Types.ObjectId(orgId), isActive: false});
    }
}