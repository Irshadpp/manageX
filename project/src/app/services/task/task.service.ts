import { Task } from "../../model/schema/task.schema";
import { TaskAttrs, TaskDoc } from "../../model/task.model";
import { ITaskService } from "./task.service.interface";

export class TaskService implements ITaskService{
    async createTask( attrs: TaskAttrs): Promise<TaskDoc> {
        const newTask = Task.build(attrs)
        return await newTask.save();
    }
}