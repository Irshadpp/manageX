import { Role } from "@ir-managex/common";
import mongoose from "mongoose";

export interface UserAttrs {
  id: string;
  fName?: string;
  lName?: string;
  email?: string;
  username?: string;
  phone?: number;
  role?: Role;
  profileURL?: string;
  isActive?: boolean;
  organizationId?: string;
}

export interface UserDoc extends mongoose.Document {
  id: string;
  fName?: string;
  lName?: string;
  email?: string;
  username?: string;
  phone?: number;
  role?: Role;
  profileURL?: string;
  isActive?: boolean;
  organizationId?: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
