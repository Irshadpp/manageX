import { ChatAttrs, ChatDoc } from "../../model/chat.model";
import { Chat } from "../../model/schema/chat.schema";
import { IChatService } from "./chat.service.interface";

export class ChatService implements IChatService{
    async createChat(attrs: ChatAttrs): Promise<ChatDoc> {
    const chat = Chat.build(attrs);
    return await chat.save();
  }

   async getChatsByUserId(userId: string): Promise<ChatDoc[] | null> {
    return await Chat.find({ participants: userId }).populate('participants', 'name email').exec();
  }
}
