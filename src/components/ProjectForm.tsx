import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectFormSchema,
  updateProjectFormSchema,
  ProjectFormValues,
  UpdateProjectFormValues,
} from "@/lib/validations";
import { Project, ProjectStatus } from "@/lib/types";
import { useUserOptions } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { Loader2, Calendar, User, FileText, Flag } from "lucide-react";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";

interface ProjectFormProps {
  project?: Project; // If provided, form is in edit mode
  onSubmit: (data: ProjectFormValues | UpdateProjectFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  variant?: "standalone" | "dialog"; // Controls whether to render as card or plain form
}

const statusOptions: { value: ProjectStatus; label: string; color: string }[] =
  [
    { value: "To-Do", label: "To-Do", color: "bg-muted text-muted-foreground" },
    {
      value: "In Progress",
      label: "In Progress",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      value: "Completed",
      label: "Completed",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    },
  ];

export const ProjectForm = ({
  project,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitButtonText,
  variant = "standalone",
}: ProjectFormProps) => {
  const {
    options: userOptions,
    isLoading: usersLoading,
    error: usersError,
  } = useUserOptions();
  const isEditMode = !!project;

  // Initialize form with project data if editing
  const form = useForm<ProjectFormValues | UpdateProjectFormValues>({
    resolver: zodResolver(
      isEditMode ? updateProjectFormSchema : projectFormSchema
    ),
    defaultValues: project
      ? {
          name: project.name,
          status: project.status,
          dueDate: project.dueDate,
          assignedTo: project.assignedTo,
          summary: project.summary,
        }
      : {
          name: "",
          status: "To-Do",
          dueDate: "",
          assignedTo: 0,
          summary: "",
        },
  });

  // Handle form submission with proper date formatting
  const handleFormSubmit = (
    data: ProjectFormValues | UpdateProjectFormValues
  ) => {
    // The form data is already in the correct format
    onSubmit(data);
  };

  // Form content component to avoid duplication
  const FormContent = () => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Project Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Project Name</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project name"
                  {...field}
                  disabled={isSubmitting}
                  className="transition-colors"
                />
              </FormControl>
              <FormDescription>
                Choose a clear and descriptive name for your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Project Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                <span>Status</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={`${option.color} border-0`}>
                          {option.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Set the current status of the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Due Date</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? parseISO(field.value) : undefined}
                  onDateChange={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                  }}
                  placeholder="Select due date"
                  disabled={isSubmitting}
                  minDate={new Date()}
                />
              </FormControl>
              <FormDescription>
                Select when this project should be completed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Assigned Team Member */}
        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Assigned Team Member</span>
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
                disabled={isSubmitting || usersLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full py-6">
                    <SelectValue
                      placeholder={
                        usersLoading
                          ? "Loading team members..."
                          : usersError
                          ? "Error loading team members"
                          : "Select team member"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userOptions.map((user) => (
                    <SelectItem key={user.value} value={user.value.toString()}>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.label}</span>
                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the team member responsible for this project.
                {usersError && (
                  <span className="block text-destructive text-sm mt-1">
                    Failed to load team members. Please try again.
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Project Summary */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Project Summary</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this project is about..."
                  className="min-h-[100px] resize-none transition-colors"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of the project goals and objectives.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="order-2 sm:order-1 w-full sm:w-auto min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || usersLoading}
            className="order-1 sm:order-2 w-full sm:w-auto min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              submitButtonText ||
              (isEditMode ? "Update Project" : "Create Project")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );

  // Dialog variant - render form content without card wrapper
  if (variant === "dialog") {
    return (
      <div className="space-y-8">
        {/* Dialog Header */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">
              {isEditMode ? "Edit Project" : "Create New Project"}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            {isEditMode
              ? "Update the project details below."
              : "Fill out the form below to create a new project."}
          </p>
        </div>

        <FormContent />
      </div>
    );
  }

  // Standalone variant - render with card wrapper
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>{isEditMode ? "Edit Project" : "Create New Project"}</span>
        </CardTitle>
        <CardDescription>
          {isEditMode
            ? "Update the project details below."
            : "Fill out the form below to create a new project."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <FormContent />
      </CardContent>
    </Card>
  );
};
