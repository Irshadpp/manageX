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
    id: string;
    title: string;
    status: ProjectStatus;
    duration: {
        length: number;
        durationType: DurationType;
    }
}

export interface Replay{
    text: string;
    user: any;
    createdAt: string;
}

export interface Comments{
    id: string;
    text: string;
    user: any;
    createdAt: string;
    replay: Replay[]
}

export interface Attachments{
    title: string;
    description: string;
    user: any;
    attachments?: string[];
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
    subTasks: SubTask[];
    attachments: Attachments[];
    comments: Comments[];
}

export interface TaskState {
    taskData: Task[];
    loading: boolean;
    error: string | null;
  }