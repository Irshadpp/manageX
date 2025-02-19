import { EmployeeAttrs, EmployeeDoc } from "../../model/employee.model";

export interface IEmployeeService{
    createEmployee(attrs: EmployeeAttrs): Promise<EmployeeDoc>
    updateEmployee(empId: string, attrs: EmployeeAttrs): Promise<EmployeeDoc | null>
    findByEmail(email: string): Promise<EmployeeDoc | null>
    findByUsername(username: string): Promise<EmployeeDoc | null>
    findByPhone(phone: number): Promise<EmployeeDoc | null>
    findEmployeesWithOrgId(orgId: string, page: number, limit: number): Promise<EmployeeDoc[]>
    countEmployees(organizationId: string): Promise<number>;
    terminateEmployee(employeeId: string, terminationReason: string): Promise<EmployeeDoc | null>; 
    fetchExEmployees(orgId: string): Promise<EmployeeDoc[]>; 
}