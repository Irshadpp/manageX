import { ChatUserCreatedEvent, Publisher, Queues } from "@ir-managex/common";
import { UserDoc } from "../../model/user.model";

export class ChatUserCreatedPublisher extends Publisher<ChatUserCreatedEvent>{
    queue: Queues.ChatUserCreated = Queues.ChatUserCreated

    async publish(data: ChatUserCreatedEvent['data']): Promise<void> {
        await super.publish(data)
    }

    static mapToEventData(createdUser: UserDoc): ChatUserCreatedEvent['data']{
        return {
            id: createdUser.id,
            fName: createdUser.fName,
            lName: createdUser.lName,
            email: createdUser.email,
            username: createdUser.username,
            phone: createdUser.phone,
            role: createdUser.role,
            profileURL: createdUser.profileURL,
            isActive: createdUser.isActive,
            organizationId: createdUser.organizationId,
        }
    }
}