import { Publisher, Queues, UserCreatedEvent } from "@ir-managex/common";
import { EmployeeAttrs } from "../../model/employee.model";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent>{
    queue: Queues.UserCreated = Queues.UserCreated

    async publish(data: UserCreatedEvent['data']): Promise<void>{
        await super.publish(data);
    }

    static moveToEventData(employee: EmployeeAttrs): UserCreatedEvent['data']{
        return {
            id: employee.id,
            fName: employee.fName!,
            lName: employee.lName!,
            email: employee.email,
            username: employee.username,
            phone: employee.phone!,
            role: employee.role,
            profileURL: employee.profileURL,
            isActive: employee.isActive,
            address: employee.address!,
            dob: employee.dob!,
            organizationId: employee.organizationId
        }
    }
}