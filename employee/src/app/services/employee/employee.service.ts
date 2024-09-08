import { EmployeeAttrs, EmployeeDoc } from "../../model/employee.model";
import { Employee } from "../../model/schema/employee.schema";
import { IEmployeeService } from "./employee.service.interface";

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
    async findEmployeesWithOrgId(orgId: string): Promise<EmployeeDoc[]>{
        return await Employee.find({organizationId: orgId, hiringData: {$exists: true}});
    }
}