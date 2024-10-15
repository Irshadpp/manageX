import mongoose from "mongoose";
import { DurationType, Priority, ProjectStatus } from "./enum";

interface SubTask{
    title: string;
    status: ProjectStatus;
    duration: {
        length: string;
        durationType: DurationType;
    }
}

export interface Comments{
    id: string;
    text: string;
    user: string;
    replays: {
        text: string;
        userId: string;
    }[]
}

interface Attachments{
    title: string;
    description: string;
    user: string;
    attachments: string[];
}

export interface TaskAttrs{
    title?: string;
    description?: string;
    projectId?: string;
    organizationId?: string;
    startDate?: Date;
    dueDate?: Date;
    status?: ProjectStatus;
    priority?: Priority;
    assignee?: string;
    subTasks?: SubTask[];
    attachments?: Attachments[];
    comments?: Comments[];
}

export interface TaskDoc extends mongoose.Document{
    id: string;
    description: string;
    projectId: string;
    organizationId: string;
    startDate: Date;
    dueDate: Date;
    status: ProjectStatus;
    priority: Priority;
    assignee: string;
    subTasks?: SubTask[];
    attachments?: Attachments[];
    comments?: Comments[];
}

export interface TaskModel extends mongoose.Model<TaskDoc>{
    build(attrs: TaskAttrs) : TaskDoc;
}