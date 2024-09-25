import mongoose from "mongoose";
import { Messagetype } from "./enum";

export interface MessageAttrs {
  id: string;
  content: any;
  type: Messagetype;
  chat: string;
  from: string;
  to: string;
}

export interface MessageDoc extends mongoose.Document {
  id: string;
  content: any;
  type: Messagetype;
  chat: string;
  from: string;
  to: string;
}

export interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}
