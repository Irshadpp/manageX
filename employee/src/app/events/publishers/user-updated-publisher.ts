import { Publisher, Queues, UserUpdatedEvent } from "@ir-managex/common";
import { EmployeeAttrs } from "../../model/employee.model";

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent>{
    queue: Queues.UserUpdated = Queues.UserUpdated

    async publish(data: UserUpdatedEvent['data']): Promise<void>{
        await super.publish(data);
    }

    //unexpected error here
    static moveToEventData(employee: EmployeeAttrs): UserUpdatedEvent['data']{
        return {
            id: employee.id,
            fName: employee.fName!,
            lName: employee.lName!,
            email: employee.email,
            username: employee.username,
            phone: employee.phone!,
            role: employee.role,
            isActive: employee.isActive,
            profileURL: employee.profileURL,
            address: employee.address!,
            dob: employee.dob!,
        }
    }
}