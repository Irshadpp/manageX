import { BadRequestError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../services/project/project.service";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    if(!orgId) throw new BadRequestError("Invalid user creadentials");

    const newProject = await projectService.createProject({...req.body, organizationId: orgId});
    res.status(201).json({success: true, message: "Project created successfully", data: newProject});
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;
    if(!id) throw new BadRequestError("Invalid params");

    const updatedProject = await projectService.updateProject(id, {...req.body});
    res.status(200).json({success: true, message: "Project updated successfully", data: updatedProject});
}

export const getProjects = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    const projects = await projectService.fetchProjectsByOrgId(orgId as string);
    res.status(200).json({success: true, message: "Projects fetched successfully", data: projects});
}