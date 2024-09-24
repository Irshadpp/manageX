import { ProjectAttrs, ProjectDoc } from "../../model/project.model";
import { Project } from "../../model/schema/poject.schema";
import { IProjectService } from "./project.service.interface";

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
}