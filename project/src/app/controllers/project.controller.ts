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

    await projectService.updateProject(id, {...req.body});
    const updatedProject = await projectService.getProjectById(id);
    res.status(200).json({success: true, message: "Project updated successfully", data: updatedProject});
}

export const getProjects = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    const projects = await projectService.fetchProjectsByOrgId(orgId as string);
    res.status(200).json({success: true, message: "Projects fetched successfully", data: projects});
}

export const fetchProjectCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {organization} = req.user!
      
      const projectData = await projectService.getCompletedProjects(organization)
  
      console.log("project count data", projectData)
      return res.status(200).json({
          success:true,
        message: "Successfully fetched the project count",
        data: projectData
      });
    } catch (error) {
      console.log(error)
      next(error)
    }
  };