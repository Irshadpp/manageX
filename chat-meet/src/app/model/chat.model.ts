import mongoose from "mongoose";
import { ChatType } from "./enum";

export interface ChatAttrs {
  id: string;
  participants?: string[];
  type?: ChatType;
  groupName?: string;
  groupDescription?: string;
  groupProfile?: string
  organizationId?: string;
}

export interface ChatDoc extends mongoose.Document {
    id: string;
    participants?: string[];
    type?: ChatType;
    groupName?: string;
    groupDescription?: string;
    groupProfile?: string
    organizationId?: string;
}

export interface ChatModel extends mongoose.Model<ChatDoc> {    
  build(attrs: ChatAttrs): ChatDoc;
}
