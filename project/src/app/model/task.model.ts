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

interface Notes{
    text: string;
    userId: string;
    replay: {
        text: string;
        userId: string;
    }
}

interface Attachments{
    title: string;
    description: string;
    userId: string;
    attachments: string[];
}

export interface TaskAttrs{
    title: string;
    description: string;
    projectId: string;
    organizationId: string;
    startDate: Date;
    dueDate: Date;
    status: ProjectStatus;
    priority: Priority;
    assignee: string;
    subTasks: SubTask;
    attachments: Attachments;
    notes: Notes;
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
    subTasks: SubTask;
    attachments: Attachments;
    notes: Notes;
}

export interface TaskModel extends mongoose.Model<TaskDoc>{
    build(attrs: TaskDoc) : TaskDoc;
}