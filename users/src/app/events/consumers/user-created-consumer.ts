import { Consumer, Queues, UserCreatedEvent } from "@ir-managex/common";
import amqp from "amqplib"
import { UserService } from "../../services/user/user.service";
import { OrgService } from "../../services/organization/org.service";

const userService = new UserService();
const orgService = new OrgService();

export class UserCreatedConsumer extends Consumer<UserCreatedEvent>{
    queue: Queues.UserCreated = Queues.UserCreated;

    async onMessage(data: UserCreatedEvent['data'], msg: amqp.Message): Promise<void>{
        try {
            const newEmployee = await userService.createEmployeeUser({...data!, id: data.id});
            await orgService.updateOrg(newEmployee.organizationId,{members: [newEmployee.id]})
            this.channel.ack(msg);
        } catch (error) {
            console.log(error,"==============> user created consumer");
            this.channel.nack(msg, false, true);
        }
    }
}