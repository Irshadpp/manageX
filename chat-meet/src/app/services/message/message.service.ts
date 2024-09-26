import { MessageAttrs, MessageDoc } from "../../model/message.model";
import { Message } from "../../model/schema/message.schema";
import { IMessageService } from "./message.service.interface";

export class MessageService implements IMessageService{
    async saveMessage(attrs: MessageAttrs): Promise<MessageDoc> {
    const message = Message.build(attrs);
    return await message.save();
  }

  async getMessagesByChatId(chatId: string): Promise<MessageDoc[] | null> {
    return await Message.find({ chat: chatId }).populate('from', 'name email').exec();
  }
}
