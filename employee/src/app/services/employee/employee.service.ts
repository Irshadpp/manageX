import { EmployeeAttrs, EmployeeDoc } from "../../model/employee.model";
import { Employee } from "../../model/schema/employee.schema";
import { IEmployeeService } from "./employee.service.interface";

export class EmployeeService implements IEmployeeService{
    async createEmployee(attrs: EmployeeAttrs): Promise<EmployeeDoc> {
        const newEmployee = Employee.build(attrs);
        return await newEmployee.save();
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
}