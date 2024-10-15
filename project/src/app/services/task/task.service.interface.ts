import { TaskAttrs, TaskDoc } from "../../model/task.model";

export interface ITaskService{
    createTask(attrs: TaskAttrs): Promise<TaskDoc | null>;
    getTasksByProjectId(projectId: string): Promise<any>;
    updateTask(taskId: string, attrs: TaskAttrs): Promise<TaskDoc | null>;
    getTaskDoneData(organizationId: string, interval: string, userId?:string,): Promise<any>;
    getNewTasks(organizationId: string, userId?: string): Promise<any>
    getCompletedTasks(organizationId: string, userId?: string):Promise<any>
}