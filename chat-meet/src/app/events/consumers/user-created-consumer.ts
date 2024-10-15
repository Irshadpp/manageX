import { Consumer, ChatUserCreatedEvent, Queues } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";
import { ChatService } from "../../services/chat/chat.service";

const userService = new UserService();
const chatService = new ChatService();

export class ChatUserCreatedConsumer extends Consumer<ChatUserCreatedEvent> {
  queue: Queues.ChatUserCreated = Queues.ChatUserCreated;

  async onMessage(data: ChatUserCreatedEvent["data"], msg: amqp.Message): Promise<void> {
    try {
      const existingUser = await userService.findUserByEmail(data.email);
      if (existingUser) {
          console.log(`User with email ${data.email} already exists. Skipping insertion.`);
          this.channel.ack(msg);
          return;
      }
      const newUser = await userService.createUser({ ...data, id: data.id });
      await chatService.createChatsForNewUser(newUser);
      this.channel.ack(msg);
  } catch (error) {
      console.log("Error in user creator consumer on project onMessage", error);
      this.channel.nack(msg, false, true);
  }
  }
}

