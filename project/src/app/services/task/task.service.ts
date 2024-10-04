import mongoose from "mongoose";
import { Task } from "../../model/schema/task.schema";
import { Comments, TaskAttrs, TaskDoc } from "../../model/task.model";
import { ITaskService } from "./task.service.interface";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { ProjectStatus } from "../../model/enum";

export class TaskService implements ITaskService {
  async createTask(attrs: TaskAttrs): Promise<TaskDoc | null> {
    const newTask = await Task.build(attrs).save(); 
    return await Task.findOne({projectId: newTask.projectId})
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

  async getTaskById(_id: string): Promise<any>{
    return await Task.findOne({ _id })
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

  async updateComment(taskId: string, commentData: any): Promise<TaskDoc | null> {
    const updatedTask =  await Task.findByIdAndUpdate(
        taskId,
        { $push: { comments: commentData } }, 
        { new: true }
    );
    return updatedTask;
}
  async replyToComment(taskId: string, commentId: string, reply: any): Promise<TaskDoc | null> {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    console.log(task.comments, commentId)

    const comment = task.comments!.find(c => c.id.toString() === commentId);
    if (!comment) throw new Error("Comment not found");

    comment.replays.push(reply);

    return await task.save();
  }

  async getComments(_id: string): Promise<any>{
    return await Task.findOne({ _id })
      .populate({
        path: "comments.user",
        model: "User",
      })
      .populate({
        path: "comments.replays.user",
        model: "User",
      })
  }

  async getTaskDoneData(organizationId: string, interval: string): Promise<any>{

    let startDate: Date, endDate: Date;

    switch (interval) {
      case "daily":
        endDate = endOfDay(new Date());
        startDate = startOfDay(new Date(endDate));
        startDate.setDate(startDate.getDate() - 9);
        break;
      case "weekly":
        endDate = endOfWeek(new Date());
        startDate = startOfWeek(new Date(endDate));
        startDate.setDate(startDate.getDate() - 9 * 7);
        break;
      case "monthly":
        endDate = endOfMonth(new Date());
        startDate = startOfMonth(new Date(endDate));
        startDate.setMonth(startDate.getMonth() - 9);
        break;
      default:
        throw new Error("Invalid interval provided");
    }
  
    const tasksByInterval = await Task.aggregate([
      {
        $match: {
          organizationId: organizationId,
          dueDate: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {
                  case: { $eq: [interval, "daily"] },
                  then: { $dateToString: { format: "%Y-%m-%d", date: "$dueDate" } },
                },
                {
                  case: { $eq: [interval, "weekly"] },
                  then: { $dateToString: { format: "%Y-%U-%d", date: "$dueDate" } },
                },
                {
                  case: { $eq: [interval, "monthly"] },
                  then: { $dateToString: { format: "%Y-%m-%d", date: "$dueDate" } },
                },
              ],
              default: null,
            },
          },
          count: { $sum: 1 },
          statuses: { $push: "$status" },
        },
      },
      {
        $project: {
          date: "$_id",
          _id: 0,
          counts: {
            $arrayToObject: {
              $map: {
                input: { $setUnion: "$statuses" },
                as: "status",
                in: {
                  k: "$$status",
                  v: {
                    $size: {
                      $filter: {
                        input: "$statuses",
                        as: "s",
                        cond: { $eq: ["$$s", "$$status"] },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$counts", { date: "$date" }],
          },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);
  
    
    const allStatuses = Object.values(ProjectStatus);
    
    tasksByInterval.forEach((entry) => {
      allStatuses.forEach((status) => {
        if (!(status in entry)) {
          entry[status] = 0;
        }
      });
    });
    
    return tasksByInterval;
  }

  async getNewTasks(organizationId: string): Promise<any>{
    try {
      const startDateOfMonth = startOfMonth(new Date());
      const dueDateOfMonth = endOfMonth(new Date());
  
      const tasksByDay = await Task.aggregate([
        {
          $match: {
            organizationId: organizationId,
            status: ProjectStatus.PLANNING,
            dueDate: {
              $gte: startDateOfMonth,
              $lte: dueDateOfMonth,
            },
          },
        },
        {
          $group: {
            _id: "$dueDate",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: 1,
          },
        },
        {
          $sort: { date: 1 },
        },
      ]);
  
      return tasksByDay;
    } catch (error) {
      console.log(error);
    }
  }

  async getCompletedTasks(organizationId: string):Promise<any>{
    try {
      const startDateOfMonth = startOfMonth(new Date());
      const dueDateOfMonth = endOfMonth(new Date());
  
      const tasksByDay = await Task.aggregate([
        {
          $match: {
            organizationId: organizationId,
            status: ProjectStatus.COMPLETED,
            dueDate: {
              $gte: startDateOfMonth,
              $lte: dueDateOfMonth,
            },
          },
        },
        {
          $group: {
            _id: "$dueDate",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: 1,
          },
        },
        {
          $sort: { date: 1 },
        },
      ]);
  
      return tasksByDay;
    } catch (error) {
      console.log(error);
    }
  }
  
}
