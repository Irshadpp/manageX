import { MessageAttrs, MessageDoc } from "../../model/message.model";
import { Message } from "../../model/schema/message.schema";
import { IMessageService } from "./message.service.interface";

export class MessageService implements IMessageService{
    async saveMessage(attrs: MessageAttrs): Promise<any> {
      console.log(attrs)
    const message = await Message.build(attrs).save();
    const messageData = await Message.findById(message.id)
    .populate({
      path: 'from',
      select: 'fName lName',
    })
    .lean();

  if (!messageData) {
    throw new Error("message not found");
  }

  const user = messageData.from as { fName: string; lName: string };
console.log(messageData)
  const formattedmessageData = {
    id: messageData._id,
    message: messageData.content,
    timestamp: messageData.createdAt,
    name: `${user.fName} ${user.lName}`,
  };

  return formattedmessageData;
  }

  async getMessagesByChatId(chatId: string): Promise<MessageDoc[] | null> {
    return await Message.find({ chat: chatId }).populate('from', 'name email').exec();
  }
}
