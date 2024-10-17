import { EmployeeCreatedEvent, Publisher, Queues } from "@ir-managex/common";
import { UserDoc } from "../../model/user.model";

export class EmployeeCreatedPublisher extends Publisher<EmployeeCreatedEvent> {
  queue: Queues.EmployeeCreated = Queues.EmployeeCreated;

  async publish(data: EmployeeCreatedEvent["data"]): Promise<void> {
    await super.publish(data);
  }

  static mapToEventData(createdUser: UserDoc): EmployeeCreatedEvent["data"] {
    return {
      id: createdUser.id,
      fName: createdUser.fName,
      lName: createdUser.lName,
      email: createdUser.email,
      username: createdUser.username,
      phone: createdUser.phone,
      role: createdUser.role,
      profileURL: createdUser.profileURL,
      dob: createdUser.dob,
      isActive: createdUser.isActive,
      organizationId: createdUser.organizationId,
    };
  }
}
