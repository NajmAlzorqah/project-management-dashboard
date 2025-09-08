import { Project } from "./types";

// Shared in-memory data store for projects
// This ensures both API endpoints use the same data
// eslint-disable-next-line prefer-const
export let projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "In Progress",
    dueDate: "2024-03-15",
    assignedTo: 1,
    summary: "Complete redesign of company website with modern UI/UX",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "To-Do",
    dueDate: "2024-04-30",
    assignedTo: 2,
    summary: "Develop cross-platform mobile app for customer engagement",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "3",
    name: "Database Migration",
    status: "Completed",
    dueDate: "2024-02-28",
    assignedTo: 3,
    summary: "Migrate legacy database to new cloud infrastructure",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-02-25T10:00:00Z",
  },
  {
    id: "4",
    name: "Security Audit",
    status: "To-Do",
    dueDate: "2024-03-30",
    assignedTo: 4,
    summary: "Comprehensive security audit of all systems and applications",
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-02-05T10:00:00Z",
  },
  {
    id: "5",
    name: "API Documentation",
    status: "In Progress",
    dueDate: "2024-03-20",
    assignedTo: 5,
    summary: "Create comprehensive API documentation for developers",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-02-10T10:00:00Z",
  },
];

// Helper functions to manage the shared data store
export const getProjects = (): Project[] => projects;

export const addProject = (project: Project): void => {
  projects.push(project);
};

export const updateProject = (updatedProject: Project): void => {
  const index = projects.findIndex((p) => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
  }
};

export const deleteProject = (projectId: string): Project | null => {
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) {
    const deleted = projects[index];
    projects.splice(index, 1);
    return deleted;
  }
  return null;
};

export const findProject = (projectId: string): Project | undefined => {
  return projects.find((p) => p.id === projectId);
};
