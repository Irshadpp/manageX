import { Task } from "../../model/schema/task.schema";
import { TaskAttrs, TaskDoc } from "../../model/task.model";
import { ITaskService } from "./task.service.interface";

export class TaskService implements ITaskService {
  async createTask(attrs: TaskAttrs): Promise<TaskDoc> {
    const newTask = Task.build(attrs);
    return await newTask.save();
  }

  async getTasksByProjectId(projectId: string): Promise<any> {
    return await Task.find({ projectId })
      .populate("assignee")
      .populate({
        path: "comments.user",
        model: "User",
      })
      .populate({
        path: "comments.replays.user",
        model: "User",
      })
      .populate({
        path: "attachments.user",
        model: "User",
      });
  }

  async updateTask(taskId: string, attrs: TaskAttrs): Promise<TaskDoc | null> {
      return await Task.findByIdAndUpdate(taskId,
        {...attrs},
        {new: true}
      )
  }
}
