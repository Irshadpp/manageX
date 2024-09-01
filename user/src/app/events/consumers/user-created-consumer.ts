import { Consumer, Queues, UserCreatedEvent } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export class UserCreatedConsumer extends Consumer<UserCreatedEvent>{
    queue: Queues.UserCreated = Queues.UserCreated;

    async onMessage(data: UserCreatedEvent['data'], msg: amqp.Message): Promise<void>{
        try {
            await userService.createEmployeeUser({...data!, id: data.id});
            this.channel.ack(msg);
        } catch (error) {
            console.log(error,"==============> user created consumer");
            this.channel.nack(msg, false, true);
        }
    }
}