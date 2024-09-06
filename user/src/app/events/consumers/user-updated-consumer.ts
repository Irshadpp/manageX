import { Consumer, Queues, UserCreatedEvent, UserUpdatedEvent } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export class UserUpdatedConsumer extends Consumer<UserUpdatedEvent>{
    queue: Queues.UserUpdated = Queues.UserUpdated;

    async onMessage(data: UserUpdatedEvent['data'], msg: amqp.Message): Promise<void>{
        try {
            console.log(data);
            await userService.updateUser(data.id, data);
            this.channel.ack(msg);
        } catch (error) {
            console.log(error,"==============> user updated consumer");
            this.channel.nack(msg, false, true);
        }
    }
}