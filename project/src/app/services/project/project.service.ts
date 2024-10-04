import { endOfMonth, startOfMonth } from "date-fns";
import { ProjectAttrs, ProjectDoc } from "../../model/project.model";
import { Project } from "../../model/schema/poject.schema";
import { IProjectService } from "./project.service.interface";
import { ProjectStatus } from "../../model/enum";
import mongoose from "mongoose";

export class ProjectService implements IProjectService{
    async createProject(attrs: ProjectAttrs): Promise<ProjectDoc> {
        const newProject = Project.build(attrs);
        return await newProject.save();
    }

    async updateProject(id: string, attrs: ProjectAttrs): Promise<ProjectDoc | null> {
        return await Project.findByIdAndUpdate(id, {...attrs}, {new: true});
    }

    async fetchProjectsByOrgId(organizationId: string): Promise<ProjectDoc[] | null> {
        return await Project.find({organizationId})
        .populate({
            path: "members",
        })
        .populate({
            path: "manager"
        })
    }

    async getProjectById(_id: string): Promise<any> {
        return await Project.findOne({_id})
        .populate({
            path: "members",
        })
        .populate({
            path: "manager"
        })
    }

    async getCompletedProjects(organizationId: string):Promise<any>{
        try {
          const startDateOfMonth = startOfMonth(new Date());
          const dueDateOfMonth = endOfMonth(new Date());

      
          const projectByDay = await Project.aggregate([
            {
              $match: {
                organizationId: new mongoose.Types.ObjectId(organizationId),
                status: ProjectStatus.COMPLETED,
                endDate: {
                  $gte: startDateOfMonth,
                  $lte: dueDateOfMonth,
                },
              },
            },
            {
              $group: {
                _id: "$endDate",
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
      
          return projectByDay;
        } catch (error) {
          console.log(error);
        }
      }
      
}