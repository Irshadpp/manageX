import { ProjectUserCreatedEvent, Publisher, Queues } from "@ir-managex/common";
import { UserDoc } from "../../model/user.model";

export class ProjectUserCreatedPublisher extends Publisher<ProjectUserCreatedEvent>{
    queue: Queues.ProjectUserCreated = Queues.ProjectUserCreated

    async publish(data: ProjectUserCreatedEvent['data']): Promise<void> {
        await super.publish(data)
    }

    static mapToEventData(createdUser: UserDoc): ProjectUserCreatedEvent['data']{
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