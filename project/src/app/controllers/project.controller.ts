import { BadRequestError, HttpStatusCode, sendResponse } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../services/project/project.service";
import { Role } from "../model/enum";
import { UserService } from "../services/user/user.service";

const projectService = new ProjectService();
const userService = new UserService();


export const createProject = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    if(!orgId) throw new BadRequestError("Invalid user creadentials");

    const newProject = await projectService.createProject({...req.body, organizationId: orgId});
    sendResponse(res, HttpStatusCode.CREATED, "Project created successfully",  newProject );
  }

export const updateProject = async (req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;
    if(!id) throw new BadRequestError("Invalid params");

    await projectService.updateProject(id, {...req.body});
    const updatedProject = await projectService.getProjectById(id);
    sendResponse(res, HttpStatusCode.OK, "Project updated successfully",  updatedProject);
  }

export const getProjects = async (req: Request, res: Response, next: NextFunction) =>{
    const orgId = req.user?.organization
    const projects = await projectService.fetchProjectsByOrgId(orgId as string);
    sendResponse(res, HttpStatusCode.OK, "Projects fetched successfully", projects);
  }

export const fetchProjectCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {organization, role, id} = req.user!

      let projectData;
      if(role === Role.EMPLOYEE){
         projectData = await projectService.getCompletedProjects(organization, id)
      }else{
           projectData = await projectService.getCompletedProjects(organization, id)
      }
  
      return sendResponse(res, HttpStatusCode.OK, "Successfully fetched the project count", projectData );
    } catch (error) {
      console.log(error)
      next(error)
    }
  };


export const fetchMembers = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const orgId = req.user?.organization;
        const {role} = req.query;
        if(!orgId) throw new BadRequestError("Invalid user credentials");
        const members = await userService.fetchEmployeesByOrgId(orgId, role as string);
        sendResponse(res, HttpStatusCode.OK, "Fetched members successfully", members );
    } catch (error) {
        next(error)
    }
}