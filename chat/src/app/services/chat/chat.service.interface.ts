import { ChatAttrs, ChatDoc } from "../../model/chat.model"
import { UserDoc } from "../../model/user.model"

export interface IChatService{
    createChat(attrs: ChatAttrs): Promise<any>
    getChatsByUserId(userId: string): Promise<ChatDoc[] | null>
    createChatsForNewUser(newUser: UserDoc): Promise<void>
}