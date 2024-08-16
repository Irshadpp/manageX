import mongoose from "mongoose";
import { Role } from "./role.enum";

export interface UserAttrs {
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  phone: number;
  password: string;
  role: Role;
  isEmailVerified: boolean;
  profileURL: string;
  dob: Date;
  isActive: boolean;
  organization: string;
}

export interface UserDoc extends mongoose.Document {
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  phone: number;
  password: string;
  role: Role;
  isEmailVerified: boolean;
  profileURL: string;
  dob: Date;
  isActive: boolean;
  organization: string;
}

export interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}