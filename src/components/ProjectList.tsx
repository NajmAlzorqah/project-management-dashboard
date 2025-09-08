import { useState, useMemo } from "react";
import { useProjects } from "@/hooks/useProjects";
import { Project, ProjectStatus } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Plus, AlertCircle, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectListProps {
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

// Loading skeleton component aligned to final card height and footer
const ProjectCardSkeleton = () => (
  <Card className="w-full min-h-56">
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-8 w-8 bg-muted rounded animate-pulse" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
    <div className="border-t bg-muted/20 px-6 py-3">
      <div className="h-4 w-40 bg-muted rounded animate-pulse" />
    </div>
  </Card>
);

// Error component
const ProjectListError = ({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Failed to load projects
      </h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {error.message ||
          "Something went wrong while fetching your projects. Please try again."}
      </p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCcw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </CardContent>
  </Card>
);

// Empty state component
const EmptyProjects = ({ onAddProject }: { onAddProject: () => void }) => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <Plus className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No projects yet
      </h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        Get started by creating your first project. Track progress, assign team
        members, and manage deadlines all in one place.
      </p>
      <Button onClick={onAddProject}>
        <Plus className="h-4 w-4 mr-2" />
        Create Your First Project
      </Button>
    </CardContent>
  </Card>
);

export const ProjectList = ({
  onAddProject,
  onEditProject,
  onDeleteProject,
}: ProjectListProps) => {
  const {
    data: projects,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useProjects();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    let filtered = projects;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.summary.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [projects, statusFilter, searchQuery]);

  // Get project counts by status
  const projectCounts = useMemo(() => {
    if (!projects)
      return { all: 0, "To-Do": 0, "In Progress": 0, Completed: 0 };

    return projects.reduce(
      (counts, project) => {
        counts.all += 1;
        counts[project.status] += 1;
        return counts;
      },
      { all: 0, "To-Do": 0, "In Progress": 0, Completed: 0 } as Record<
        string,
        number
      >
    );
  }, [projects]);

  const handleRetry = () => {
    refetch();
  };

  // Show loading skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton (matches final layout heights) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
        {/* Filters skeleton to reserve space and avoid CLS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="h-10 w-full max-w-sm bg-muted rounded animate-pulse" />
          <div className="h-10 w-full sm:w-48 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <Button onClick={onAddProject} disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
        <ProjectListError error={error} onRetry={handleRetry} />
      </div>
    );
  }

  // Show empty state
  if (!projects || projects.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Projects
          </h2>
          <Button onClick={onAddProject} className="flex-shrink-0">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Project</span>
          </Button>
        </div>
        <EmptyProjects onAddProject={onAddProject} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Projects
          </h2>
          <Badge variant="secondary" className="text-sm">
            {projectCounts.all} total
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRefetching}
            className="flex-shrink-0"
          >
            {isRefetching ? (
              <Loader2 className="h-4 w-4 sm:mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button onClick={onAddProject} className="flex-shrink-0">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Project</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={(value: ProjectStatus | "all") =>
            setStatusFilter(value)
          }
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All Projects ({projectCounts.all})
            </SelectItem>
            <SelectItem value="To-Do">
              To-Do ({projectCounts["To-Do"]})
            </SelectItem>
            <SelectItem value="In Progress">
              In Progress ({projectCounts["In Progress"]})
            </SelectItem>
            <SelectItem value="Completed">
              Completed ({projectCounts["Completed"]})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground max-w-md">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No projects match your current filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};
