import { ProjectForm } from "./ProjectForm";
import { Project } from "@/lib/types";
import { ProjectFormValues } from "@/lib/validations";
import { useUpdateProjectOptimistic } from "@/hooks/useProjects";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface EditProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditProjectModal = ({
  project,
  open,
  onOpenChange,
}: EditProjectModalProps) => {
  const { toast } = useToast();
  const updateProjectMutation = useUpdateProjectOptimistic();

  const handleSubmit = async (data: ProjectFormValues) => {
    if (!project) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        id: project.id,
      });

      // Show success toast
      toast({
        title: "Project updated successfully!",
        description: `${data.name} has been updated.`,
        variant: "default",
      });

      // Close the modal
      onOpenChange(false);
    } catch (error) {
      // Show error toast
      toast({
        title: "Failed to update project",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    // Reset the mutation state if needed
    if (updateProjectMutation.isError) {
      updateProjectMutation.reset();
    }
    onOpenChange(false);
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto p-8">
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the project details below.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          project={project}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateProjectMutation.isPending}
          submitButtonText="Update Project"
          variant="dialog"
        />
      </DialogContent>
    </Dialog>
  );
};
