import { MessageAttrs, MessageDoc } from "../../model/message.model"

export interface IMessageService{
    saveMessage(attrs: MessageAttrs): Promise<MessageDoc>
    getMessagesByChatId(id: string): Promise<MessageDoc[] | null>
}