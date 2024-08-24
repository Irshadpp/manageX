import mongoose from "mongoose";
import { Role } from "./enum";

export interface UserAttrs {
  fName?: string;
  lName?: string;
  email: string;
  username: string;
  phone: number;
  password: string;
  role: Role;
  isEmailVerified: boolean;
  profileURL: string;
  dob: Date;
  isActive: boolean;
  organizationId: string;
}

export interface UserDoc extends mongoose.Document {
  fName: string;
  lName: string;
  email: string;
  username: string;
  phone: number;
  password: string;
  role: Role;
  isEmailVerified: boolean;
  profileURL: string;
  dob: Date;
  isActive: boolean;
  organizationId: string;
}

export interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}