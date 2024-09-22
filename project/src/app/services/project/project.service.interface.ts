import { ProjectAttrs, ProjectDoc } from "../../model/project.model";

export interface IProjectService{
    createProject(attrs: ProjectAttrs): Promise<ProjectDoc>;
    updateProject(id: string, attrs: ProjectAttrs): Promise<ProjectDoc | null>;
    fetchProjectsByOrgId(orgId: string): Promise<ProjectDoc[] | null>;
}