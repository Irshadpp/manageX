import { MessageAttrs, MessageDoc } from "../../model/message.model"

export interface IMessageService{
    saveMessage(attrs: MessageAttrs): Promise<any>
    getMessagesByChatId(id: string): Promise<MessageDoc[] | null>
}