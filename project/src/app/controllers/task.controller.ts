import { BadRequestError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task/task.service";

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    const {projectId} = req.params;
    if(!orgId || !projectId) throw new BadRequestError("Invalid user creadentials");

    const newTask = await taskService.createTask({...req.body, organizationId: orgId, projectId});
    res.status(201).json({success: true, message: "Task created successfully", data: newTask});
}

export const fetchTasks = async (req: Request, res: Response, next: NextFunction) =>{
    const {projectId} = req.params;
    if(!projectId) throw new BadRequestError("Invalid projectId");

    const tasks = await taskService.getTasksByProjectId(projectId)
    res.status(200).json({success: true, message: "Tasks fetched successfully", data: tasks});
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
    res.status(200).json({success: true, message: "Tasks updated successfully", data: updatedTask});
}

export const replyToComment = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const commentId = req.query.id as string
    const { text, user } = req.body;

    try {
        await taskService.replyToComment(taskId, commentId, { text, user });
        const updatedTask = await taskService.getTaskById(taskId)
        res.status(200).json({ success: true, message: "Reply added successfully", data: updatedTask });
    } catch (error) {
        next(error);
    }
};

export const fetchComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const task = await taskService.getComments(taskId)
        res.status(200).json({ success: true, message: "Reply added successfully", data: task.comments });
    } catch (error) {
        next(error);
    }
};