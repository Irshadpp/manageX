import mongoose from "mongoose";
import { ChatType } from "./enum";

export interface UserAttrs {
  id: string;
  participants?: string[];
  type?: ChatType;
  groupName?: string;
  groupDescription?: string;
  groupProfile?: string
  organizationId?: string;
}

export interface UserDoc extends mongoose.Document {
    id: string;
    participants?: string[];
    type?: ChatType;
    groupName?: string;
    groupDescription?: string;
    groupProfile?: string
    organizationId?: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
