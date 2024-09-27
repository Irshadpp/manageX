import { Consumer, ChatUserUpdatedEvent, Queues } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export class ChatUserUpdatedConsumer extends Consumer<ChatUserUpdatedEvent> {
  queue: Queues.ChatUserUpdated = Queues.ChatUserUpdated;

  async onMessage(data: ChatUserUpdatedEvent["data"], msg: amqp.Message): Promise<void> {
    try {
      const newUser = await userService.updateUser(data.id, data);
      this.channel.ack(msg)
    } catch (error) {
      console.log(
        "error in user creator consumer on chat user update onMesage======================>",
        error
      );
      this.channel.nack(msg, false, true)
    }
  }
}

