import { ProjectStatus } from "./project";

enum Priority{
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

enum DurationType{
    MINUTES = "minutes",
    HOURS = "hours",
    DAY = "day"
}

export interface SubTask{
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

export interface Task{
    id: string;
    title?: string;
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

export interface TaskState {
    taskData: Task[];
    loading: boolean;
    error: string | null;
  }