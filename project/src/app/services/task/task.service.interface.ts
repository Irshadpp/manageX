import { TaskAttrs, TaskDoc } from "../../model/task.model";

export interface ITaskService{
    createTask(attrs: TaskAttrs): Promise<TaskDoc>;
}