import mongoose from "mongoose";
import { EMPTYPE, GENDER, Role } from "./enum";

export interface Address{
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export interface EmployeeAttrs {
  lName?: string;
  email: string;
  username: string;
  phone: number;
  role: Role;
  profileURL: string;
  dob: Date;
  hiringData: Date;
  salary: number;
  designation: string;
  employeeType: EMPTYPE;
  gender: GENDER;
  address: Address;
  terminationReason: string;
  isActive: boolean;
  organizationId: string;
}

export interface EmployeeDoc extends mongoose.Document {
  lName?: string;
  email: string;
  username: string;
  phone: number;
  role: Role;
  profileURL: string;
  dob: Date;
  hiringData: Date;
  salary: number;
  designation: string;
  employeeType: EMPTYPE;
  gender: GENDER;
  address: Address;
  terminationReason: string;
  isActive: boolean;
  organizationId: string;
}

export interface employeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
}
