import mongoose from "mongoose";
import { Messagetype } from "./enum";

export interface MessageAttrs {
  content: any;
  type: Messagetype;
  chatId: string;
  from: string;
  to: string;
}

export interface MessageDoc extends mongoose.Document {
  id: string;
  content: any;
  type: Messagetype;
  chatId: string;
  from: string;
  to: string;
}

export interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}
