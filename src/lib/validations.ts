import { z } from "zod";

// Project status enum for validation
const projectStatusEnum = z.enum(["To-Do", "In Progress", "Completed"]);

// Project form validation schema for creating new projects
export const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters")
    .trim(),

  status: projectStatusEnum,

  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        return selectedDate >= today;
      },
      {
        message: "Due date must be today or in the future",
      }
    ),

  assignedTo: z.number().min(1, "Please select a team member"),

  summary: z
    .string()
    .min(1, "Project summary is required")
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary must be less than 500 characters")
    .trim(),
});

// Project form validation schema for updating existing projects
// Allows past dates for updates to accommodate existing projects
export const updateProjectFormSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters")
    .trim(),

  status: projectStatusEnum,

  dueDate: z.string().min(1, "Due date is required"),
  // No future date restriction for updates

  assignedTo: z.number().min(1, "Please select a team member"),

  summary: z
    .string()
    .min(1, "Project summary is required")
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary must be less than 500 characters")
    .trim(),
});

// Type inference from schemas
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectFormSchema>;

// Validation for individual fields (useful for real-time validation)
export const validateProjectName = (name: string): string | null => {
  try {
    projectFormSchema.shape.name.parse(name);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || "Invalid project name";
    }
    return "Invalid project name";
  }
};

export const validateDueDate = (
  date: string,
  isUpdate = false
): string | null => {
  try {
    if (isUpdate) {
      updateProjectFormSchema.shape.dueDate.parse(date);
    } else {
      projectFormSchema.shape.dueDate.parse(date);
    }
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || "Invalid due date";
    }
    return "Invalid due date";
  }
};

export const validateSummary = (summary: string): string | null => {
  try {
    projectFormSchema.shape.summary.parse(summary);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || "Invalid summary";
    }
    return "Invalid summary";
  }
};

// Helper to format validation errors for display
export const formatValidationError = (
  error: z.ZodError
): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};

  error.issues.forEach((err: z.ZodIssue) => {
    if (err.path.length > 0) {
      formattedErrors[err.path[0] as string] = err.message;
    }
  });

  return formattedErrors;
};
