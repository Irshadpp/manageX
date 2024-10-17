import { ProjectUserUpdatedEvent, Publisher, Queues } from "@ir-managex/common";
import { UserDoc } from "../../model/user.model";

export class ProjectUserUpdatedPublisher extends Publisher<ProjectUserUpdatedEvent>{ 
    queue : Queues.ProjectUserUpdated = Queues.ProjectUserUpdated 

    async publish(data: ProjectUserUpdatedEvent['data']): Promise<void> {
        await super.publish(data)
    }

    static mapToEventData(updateUser: UserDoc): ProjectUserUpdatedEvent['data']{
        return {
            id: updateUser.id,
            fName: updateUser.fName,
            lName: updateUser.lName,
            email: updateUser.email,
            username: updateUser.username,
            phone: updateUser.phone,
            role: updateUser.role,
            profileURL: updateUser.profileURL,
            isActive: updateUser.isActive,
            organizationId: updateUser.organizationId,
        }
    }
}