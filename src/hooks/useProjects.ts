import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api";
import {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "@/lib/types";

// Query keys for consistent caching
export const projectsKeys = {
  all: ["projects"] as const,
  lists: () => [...projectsKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...projectsKeys.lists(), { filters }] as const,
  details: () => [...projectsKeys.all, "detail"] as const,
  detail: (id: string) => [...projectsKeys.details(), id] as const,
};

// Hook to fetch all projects
export const useProjects = () => {
  return useQuery({
    queryKey: projectsKeys.lists(),
    queryFn: projectsAPI.getProjects,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to create a new project
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsAPI.createProject,
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create project:", error);
    },
  });
};

// Hook to update an existing project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsAPI.updateProject,
    onSuccess: (updatedProject: Project) => {
      // Update the project in the cache and invalidate to ensure fresh data
      queryClient.setQueryData<Project[]>(projectsKeys.lists(), (oldData) => {
        if (!oldData) return [updatedProject];
        return oldData.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );
      });

      // Also invalidate to ensure we get fresh data from the server
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to update project:", error);
    },
  });
};

// Hook to delete a project (for future use)
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsAPI.deleteProject,
    onSuccess: (_, deletedProjectId) => {
      // Remove the project from the cache
      queryClient.setQueryData<Project[]>(projectsKeys.lists(), (oldData) => {
        if (!oldData) return [];
        return oldData.filter((project) => project.id !== deletedProjectId);
      });
    },
    onError: (error) => {
      console.error("Failed to delete project:", error);
    },
  });
};

// Optimistic update hook for creating projects
export const useCreateProjectOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsAPI.createProject,
    onMutate: async (newProject: CreateProjectRequest) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: projectsKeys.lists() });

      // Snapshot the previous value
      const previousProjects = queryClient.getQueryData<Project[]>(
        projectsKeys.lists()
      );

      // Create optimistic project
      const optimisticProject: Project = {
        ...newProject,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Optimistically update the cache
      queryClient.setQueryData<Project[]>(projectsKeys.lists(), (old) =>
        old ? [...old, optimisticProject] : [optimisticProject]
      );

      // Return a context object with the snapshotted value
      return { previousProjects, optimisticProject };
    },
    onError: (err, newProject, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProjects) {
        queryClient.setQueryData(
          projectsKeys.lists(),
          context.previousProjects
        );
      }
    },
    onSuccess: (data, variables, context) => {
      // Replace optimistic project with real project
      queryClient.setQueryData<Project[]>(projectsKeys.lists(), (old) => {
        if (!old || !context?.optimisticProject) return [data];
        return old.map((project) =>
          project.id === context.optimisticProject.id ? data : project
        );
      });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
  });
};

// Optimistic update hook for updating projects
export const useUpdateProjectOptimistic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsAPI.updateProject,
    onMutate: async (updatedProject: UpdateProjectRequest) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: projectsKeys.lists() });

      // Snapshot the previous value
      const previousProjects = queryClient.getQueryData<Project[]>(
        projectsKeys.lists()
      );

      // Optimistically update the cache with proper data merging
      queryClient.setQueryData<Project[]>(projectsKeys.lists(), (old) => {
        if (!old) return [];
        return old.map((project) => {
          if (project.id === updatedProject.id) {
            // Check if any data has actually changed
            const hasChanges =
              project.name !== updatedProject.name ||
              project.status !== updatedProject.status ||
              project.dueDate !== updatedProject.dueDate ||
              project.assignedTo !== updatedProject.assignedTo ||
              project.summary !== updatedProject.summary;

            return {
              ...project,
              ...updatedProject,
              id: updatedProject.id, // Ensure ID is preserved
              // Only update the timestamp if there are actual changes
              updatedAt: hasChanges
                ? new Date().toISOString()
                : project.updatedAt,
            };
          }
          return project;
        });
      });

      // Return a context object with the snapshotted value
      return { previousProjects };
    },
    onError: (err, updatedProject, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProjects) {
        queryClient.setQueryData(
          projectsKeys.lists(),
          context.previousProjects
        );
      }
    },
    onSuccess: (data) => {
      // Update with the actual server response to ensure accuracy
      queryClient.setQueryData<Project[]>(projectsKeys.lists(), (old) => {
        if (!old) return [data];
        return old.map((project) => (project.id === data.id ? data : project));
      });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: projectsKeys.lists() });
    },
  });
};
