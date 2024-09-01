import { Consumer, EmployeeCreatedEvent, Queues } from "@ir-managex/common";
import amqp from "amqplib"
import { EmployeeService } from "../../services/employee/employee.service";

const employeeService = new EmployeeService();

export class EmployeeCreatedConsumer extends Consumer<EmployeeCreatedEvent> {
  queue: Queues = Queues.EmployeeCreated;

  async onMessage(data: EmployeeCreatedEvent["data"], msg: amqp.Message): Promise<void> {
    try {
      await employeeService.createEmployee({...data, id: data.id});
      this.channel.ack(msg)
    } catch (error) {
      console.log(
        "error in employee creator consumer onMesage======================>",
        error
      );
      this.channel.nack(msg, false, true)
    }
  }
}

