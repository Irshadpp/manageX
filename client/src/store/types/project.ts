export enum ProjectStatus {
  PLANNING = "planning",
  ACTIVE = "active",
  COMPLETED = "completed",
  BACKLOG = "backlog",
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  members: any[];
  tasks: string[];
  manager: string;
  client: string;
  deal: string;
  organizationId: string;
  createdAt: Date;
}

export interface ProjectState {
  projectData: Project[];
  loading: boolean;
  error: string | null;
  shouldRefetch: boolean;
}


