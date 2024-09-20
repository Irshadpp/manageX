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