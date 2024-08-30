import { EmployeeCreatedEvent, Publisher, Queues } from "@ir-managex/common";

export class EmployeeCreatedPublisher extends Publisher<EmployeeCreatedEvent>{
    queue: Queues = Queues.EmployeeCreated;
}