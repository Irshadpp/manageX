import mongoose from "mongoose";
import { Messagetype } from "./enum";

export interface UserAttrs {
  id: string;
  content: any;
  type: Messagetype;
  chat: string;
  from: string;
  to: string;
}

export interface UserDoc extends mongoose.Document {
    id: string;
  content: any;
  type: Messagetype;
  chat: string;
  from: string;
  to: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
