import { ProjectForm } from "./ProjectForm";
import { ProjectFormValues } from "@/lib/validations";
import { useCreateProjectOptimistic } from "@/hooks/useProjects";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProjectModal = ({
  open,
  onOpenChange,
}: AddProjectModalProps) => {
  const { toast } = useToast();
  const createProjectMutation = useCreateProjectOptimistic();

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      await createProjectMutation.mutateAsync(data);

      // Show success toast
      toast({
        title: "Project created successfully!",
        description: `${data.name} has been added to your projects.`,
        variant: "default",
      });

      // Close the modal
      onOpenChange(false);
    } catch (error) {
      // Show error toast
      toast({
        title: "Failed to create project",
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
    if (createProjectMutation.isError) {
      createProjectMutation.reset();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto p-8">
        <DialogHeader className="sr-only">
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Create a new project by filling out the form below.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createProjectMutation.isPending}
          submitButtonText="Create Project"
          variant="dialog"
        />
      </DialogContent>
    </Dialog>
  );
};
