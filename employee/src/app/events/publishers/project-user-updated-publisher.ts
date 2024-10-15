import { ProjectUserUpdatedEvent, Publisher, Queues } from "@ir-managex/common";
import { EmployeeDoc } from "../../model/employee.model";

export class ProjectUserUpdatedPublisher extends Publisher<ProjectUserUpdatedEvent>{
    queue: Queues.ProjectUserUpdated = Queues.ProjectUserUpdated
    async publish(data: ProjectUserUpdatedEvent['data']): Promise<void> {
        await super.publish(data)   
    }

    static mapToEventData(updatedUser: EmployeeDoc): ProjectUserUpdatedEvent['data']{
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