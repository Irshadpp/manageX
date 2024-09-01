import { EmployeeAttrs, EmployeeDoc } from "../../model/employee.model";

export interface IEmployeeService{
    createEmployee(attrs: EmployeeAttrs): Promise<EmployeeDoc>
    findByEmail(email: string): Promise<EmployeeDoc | null>
    findByUsername(username: string): Promise<EmployeeDoc | null>
    findByPhone(phone: number): Promise<EmployeeDoc | null>
}