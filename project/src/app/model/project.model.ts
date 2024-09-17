import mongoose from "mongoose";
import { ProjectStatus } from "./enum";

export interface ProjectAttrs{
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    members: string[];
    tasks: string[];
    manager: string;
    client: string;
    deal: string;
    organizationId: string;
}

export interface ProjectDoc extends mongoose.Document{
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    members: string[];
    tasks: string[];
    manager: string;
    client: string;
    deal: string;
    organizationId: string;
    createdAt: Date;
}

export interface ProjectModel extends mongoose.Model<ProjectDoc>{
    build(attrs: ProjectAttrs) : ProjectDoc;
}