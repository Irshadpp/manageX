import mongoose from "mongoose";
import { ChatAttrs, ChatDoc, ChatModel } from "../chat.model";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    type: {
      type: String,
    },
    groupName: {
      type: String,
    },
    groupDescreption: {
      type: String,
    },
    groupProfile: {
      type: String,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

chatSchema.statics.build = (attrs: ChatAttrs) => {
  return new Chat(attrs);
};

const Chat = mongoose.model<ChatDoc, ChatModel>("Chat", chatSchema);

export { Chat };
