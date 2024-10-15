import mongoose from "mongoose";
import { MessageAttrs, MessageDoc } from "../../model/message.model";
import { Message } from "../../model/schema/message.schema";
import { IMessageService } from "./message.service.interface";

export class MessageService implements IMessageService {
  async saveMessage(attrs: MessageAttrs): Promise<any> {
    const message = await Message.build(attrs).save();
    const messageData = await Message.findById(message.id)
      .populate({
        path: "from",
        select: "fName lName id",
      })
      .lean();

    if (!messageData) {
      throw new Error("message not found");
    }

    const user = messageData.from as { fName: string; lName: string; _id: any };
    const formattedmessageData = {
      chatId: messageData.chatId,
      message: {
        id: messageData._id,
        type: messageData.type,
        message: messageData.content,
        timestamp: messageData.createdAt,
        name: `${user.fName} ${user.lName}`,
        userId: user._id
      },
    };

    return formattedmessageData;
  }

  async getMessagesByChatId(chatId: string): Promise<MessageDoc[] | null> {
    return await Message.find({ chat: chatId })
      .populate("from", "name email")
      .exec();
  }
}
