import { ChatUserUpdatedEvent, Publisher, Queues } from "@ir-managex/common";
import { UserDoc } from "../../model/user.model";

export class ChatUserUpdatedPublisher extends Publisher<ChatUserUpdatedEvent>{
    queue: Queues.ChatUserUpdated = Queues.ChatUserUpdated

    async publish(data: ChatUserUpdatedEvent['data']): Promise<void> {
        await super.publish(data)
    }

    static mapToEventData(updatedUser: UserDoc): ChatUserUpdatedEvent['data']{
        return {
            id: updatedUser.id,
            fName: updatedUser.fName,
            lName: updatedUser.lName,
            email: updatedUser.email,
            username: updatedUser.username,
            phone: updatedUser.phone,
            role: updatedUser.role,
            profileURL: updatedUser.profileURL,
            isActive: updatedUser.isActive,
            organizationId: updatedUser.organizationId,
        }
    }
}