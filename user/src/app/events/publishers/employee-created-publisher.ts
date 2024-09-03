import { EmployeeCreatedEvent, Publisher, Queues } from "@ir-managex/common";
import { UserDoc } from "../../model/user.model";

export class EmployeeCreatedPublisher extends Publisher<EmployeeCreatedEvent> {
  queue: Queues.EmployeeCreated = Queues.EmployeeCreated;

  async publish(data: EmployeeCreatedEvent["data"]): Promise<void> {
    console.log("publishing message...........................!")
    await super.publish(data);
  }

  static mapToEventData(updatedUser: UserDoc): EmployeeCreatedEvent["data"] {
    console.log(updatedUser.email,"--------------------")
    return {
      id: updatedUser.id,
      fName: updatedUser.fName,
      lName: updatedUser.lName,
      email: updatedUser.email,
      username: updatedUser.username,
      phone: updatedUser.phone,
      role: updatedUser.role,
      profileURL: updatedUser.profileURL,
      dob: updatedUser.dob,
      isActive: updatedUser.isActive,
      organizationId: updatedUser.organizationId,
    };
  }
}
