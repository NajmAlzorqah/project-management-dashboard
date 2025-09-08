export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  dueDate: string;
  assignedTo: number;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = "To-Do" | "In Progress" | "Completed";

export interface CreateProjectRequest {
  name: string;
  status: ProjectStatus;
  dueDate: string;
  assignedTo: number;
  summary: string;
}

export interface UpdateProjectRequest extends CreateProjectRequest {
  id: string;
}

export interface APIResponse<T> {
  data: T;
  message: string;
}

export interface APIError {
  message: string;
  errors?: Record<string, string[]>;
}
