import { BadRequestError, CommonMessages, HttpStatusCode, sendResponse } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task/task.service";
import { Role } from "../model/enum";

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    const {projectId} = req.params;
    if(!orgId || !projectId) throw new BadRequestError("Invalid user creadentials");

    const newTask = await taskService.createTask({...req.body, organizationId: orgId, projectId});
    sendResponse(res, HttpStatusCode.CREATED, "Task created successfully", newTask);
  }

export const fetchTasks = async (req: Request, res: Response, next: NextFunction) =>{
    const {projectId} = req.params;
    if(!projectId) throw new BadRequestError("Invalid projectId");

    const tasks = await taskService.getTasksByProjectId(projectId)
    sendResponse(res, HttpStatusCode.OK, "Tasks fetched successfully", tasks);
  }

export const updateTask = async (req: Request, res: Response, next: NextFunction) =>{
    const {taskId} = req.params;
    if(!taskId) throw new BadRequestError("Invalid taskId");

    const isComment = req.query.comment === 'true';

    console.log(req.body)

    if(isComment){
        await taskService.updateComment(taskId, req.body);
    }else{
        await taskService.updateTask(taskId, req.body)
    }

    const updatedTask = await taskService.getTaskById(taskId)
    sendResponse(res, HttpStatusCode.OK, "Tasks updated successfully", updatedTask);
  }

export const replyToComment = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const commentId = req.query.id as string
    const { text, user } = req.body;

    try {
        await taskService.replyToComment(taskId, commentId, { text, user });
        const updatedTask = await taskService.getTaskById(taskId)
        sendResponse(res, HttpStatusCode.OK, "Reply added successfully", updatedTask);
      } catch (error) {
        next(error);
    }
};

export const fetchComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const task = await taskService.getComments(taskId)
        sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, task.comments);
      } catch (error) {
        next(error);
    }
};

export const fetchTaskDoneData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {organization, role, id} = req.user!
    const { interval } = req.query;

    let taskData;

    if(role === Role.EMPLOYEE){
        taskData = await taskService.getTaskDoneData(organization, interval as string, id);
    }else{
        taskData = await taskService.getTaskDoneData(organization, interval as string);
    }

    return sendResponse(res, HttpStatusCode.OK, "Successfully fetched the task data", taskData );
  } catch (error) {
    console.log(error)
    next(error)
  }
};



export const fetchTaskCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {organization, role, id} = req.user!
    
    let taskData: any = {}
    if(role === Role.EMPLOYEE){
        taskData["taskCompleted"] = await taskService.getCompletedTasks(organization, id)
        taskData["newTask"] = await taskService.getNewTasks(organization, id);
    }else{
        taskData["taskCompleted"] = await taskService.getCompletedTasks(organization)
        taskData["newTask"] = await taskService.getNewTasks(organization);
    }

    return sendResponse(res, HttpStatusCode.OK, "Successfully fetched the task count", taskData);
  } catch (error) {
    console.log(error)
    next(error)
  }
};
