import { Consumer, EmployeeCreatedEvent, Queues } from "@ir-managex/common";
import amqp from "amqplib"
import { EmployeeService } from "../../services/employee/employee.service";
import { AttendancePolicyService } from "../../services/attendance/attendance-policy.service";

const employeeService = new EmployeeService();
const attendancePolicyService = new AttendancePolicyService();

export class EmployeeCreatedConsumer extends Consumer<EmployeeCreatedEvent> {
  queue: Queues.EmployeeCreated = Queues.EmployeeCreated;

  async onMessage(data: EmployeeCreatedEvent["data"], msg: amqp.Message): Promise<void> {
    try {
      const newEmployee = await employeeService.createEmployee({...data, id: data.id});
      await attendancePolicyService.createAttendancePolicy({organizationId: newEmployee.organizationId})
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

