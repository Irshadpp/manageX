import mongoose from "mongoose";
import { EmpType, Gender, Role } from "./enum";

export interface Address{
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export interface EmployeeAttrs {
  id: string;
  fName?: string;
  lName?: string;
  email: string;
  username: string;
  phone?: number;
  role: Role;
  profileURL?: string;
  dob?: Date;
  hiringData?: Date;
  salary?: number;
  designation?: string;
  employeeType?: EmpType;
  gender?: Gender;
  address?: Address;
  terminationReason?: string;
  isActive: boolean;
  organizationId: string;
}

export interface EmployeeDoc extends mongoose.Document {
  id: string;
  fName?: string;
  lName?: string;
  email: string;
  username: string;
  phone: number;
  role: Role;
  profileURL: string;
  dob: Date;
  hiringDate: Date;
  salary: number;
  designation: string;
  employeeType: EmpType;
  gender: Gender;
  address: Address;
  terminationReason: string;
  isActive: boolean;
  organizationId: string;
}

export interface employeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
}
