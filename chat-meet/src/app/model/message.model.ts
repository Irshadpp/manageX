import mongoose from "mongoose";
import { Messagetype } from "./enum";
import { UserDoc } from "./user.model";

export interface MessageAttrs {
  content: any;
  type: Messagetype;
  chatId: string;
  from:  mongoose.Schema.Types.ObjectId | UserDoc;
  // to: string;
}

export interface MessageDoc extends mongoose.Document {
  id: string;
  content: any;
  type: Messagetype;
  chatId: string;
  from:  mongoose.Schema.Types.ObjectId | UserDoc;
  createdAt: Date;
  // to: string;
}

export interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}
