import { Consumer, EmployeeCreatedEvent, Queues } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export class EmployeeCreatedConsumer extends Consumer<EmployeeCreatedEvent> {
  queue: Queues.EmployeeCreated = Queues.EmployeeCreated;

  async onMessage(data: EmployeeCreatedEvent["data"], msg: amqp.Message): Promise<void> {
    try {
      const newUser = await userService.createUser({...data, id: data.id});
      this.channel.ack(msg)
    } catch (error) {
      console.log(
        "error in user creator consumer on project onMesage======================>",
        error
      );
      this.channel.nack(msg, false, true)
    }
  }
}

