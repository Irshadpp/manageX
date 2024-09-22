import { Consumer, ProjectUserUpdatedEvent, Queues } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export class ProjectUserUpdatedConsumer extends Consumer<ProjectUserUpdatedEvent> {
  queue: Queues.ProjectUserUpdated = Queues.ProjectUserUpdated;

  async onMessage(data: ProjectUserUpdatedEvent["data"], msg: amqp.Message): Promise<void> {
    try {
      const newUser = await userService.updateUser(data.id, data);
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

