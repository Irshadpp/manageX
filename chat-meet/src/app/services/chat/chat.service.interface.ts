import { ChatAttrs, ChatDoc } from "../../model/chat.model"

export interface IChatService{
    createChat(attrs: ChatAttrs): Promise<ChatDoc>
    getChatsByUserId(userId: string): Promise<ChatDoc[] | null>
}