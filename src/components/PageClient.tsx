"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Project } from "@/lib/types";
import { ProjectList } from "@/components/ProjectList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useDeleteProject } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";

// Lazy-load modals only when needed; disable SSR to avoid unnecessary work
const AddProjectModal = dynamic(
  () => import("@/components/AddProjectModal").then((m) => m.AddProjectModal),
  { ssr: false }
);
const EditProjectModal = dynamic(
  () => import("@/components/EditProjectModal").then((m) => m.EditProjectModal),
  { ssr: false }
);

export default function PageClient() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const deleteProjectMutation = useDeleteProject();
  const { toast } = useToast();

  const handleAddProject = () => {
    setShowAddModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleCloseEditModal = () => {
    setEditingProject(null);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProjectMutation.mutateAsync(projectId);
      toast({
        title: "Project deleted successfully!",
        description: "The project has been removed from your list.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to delete project",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40 h-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  Project Management Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Manage your projects efficiently
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProjectList
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        </main>
      </div>

      {/* Modals (lazy-loaded) */}
      <AddProjectModal open={showAddModal} onOpenChange={setShowAddModal} />

      <EditProjectModal
        project={editingProject}
        open={!!editingProject}
        onOpenChange={handleCloseEditModal}
      />
    </>
  );
}
