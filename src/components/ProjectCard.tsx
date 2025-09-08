import { Project } from "@/lib/types";
import { useUser } from "@/hooks/useUsers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, User, Edit3, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { isAfter } from "date-fns/isAfter";
import { memo, useState } from "react";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

// Helper function to get status variant
const getStatusVariant = (status: Project["status"]) => {
  switch (status) {
    case "Completed":
      return "default"; // Green
    case "In Progress":
      return "secondary"; // Blue
    case "To-Do":
      return "outline"; // Gray
    default:
      return "outline";
  }
};

// Helper function to get status color class using semantic colors
const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "Completed":
      return "text-green-700 bg-green-100 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
    case "In Progress":
      return "text-blue-700 bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800";
    case "To-Do":
      return "text-muted-foreground bg-muted border-border";
    default:
      return "text-muted-foreground bg-muted border-border";
  }
};

// Helper function to check if due date is overdue
const isOverdue = (dueDate: string, status: Project["status"]) => {
  if (status === "Completed") return false;
  return isAfter(new Date(), parseISO(dueDate));
};

const ProjectCardBase = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data: assignedUser, isLoading: userLoading } = useUser(
    project.assignedTo
  );
  const overdue = isOverdue(project.dueDate, project.status);

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {project.name}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {project.summary}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(project)}
              className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
              aria-label={`Edit ${project.name}`}
            >
              <Edit3 className="h-4 w-4" />
            </Button>

            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  aria-label={`Delete ${project.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{project.name}&quot;?
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(project.id);
                      setIsDeleteDialogOpen(false);
                    }}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status Badge */}
          <div className="flex items-center justify-between min-h-7">
            <Badge
              variant={getStatusVariant(project.status)}
              className={getStatusColor(project.status)}
            >
              {project.status}
            </Badge>
            {overdue && (
              <Badge variant="destructive" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Overdue
              </Badge>
            )}
          </div>

          {/* Due Date */}
          <div className="flex items-center text-sm text-muted-foreground min-h-5">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className={overdue ? "text-destructive font-medium" : ""}>
              Due {formatDate(project.dueDate)}
            </span>
          </div>

          {/* Assigned User */}
          <div className="flex items-center text-sm text-muted-foreground min-h-5">
            <User className="w-4 h-4 mr-2 flex-shrink-0" />
            {userLoading ? (
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            ) : assignedUser ? (
              <span className="truncate">{assignedUser.name}</span>
            ) : (
              <span className="text-muted-foreground/60 italic">
                User not found
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 text-xs text-muted-foreground border-t bg-muted/20 min-h-9">
        <div className="flex justify-between items-center w-full">
          <span>Created {formatDate(project.createdAt)}</span>
          {project.updatedAt !== project.createdAt && (
            <span>Updated {formatDate(project.updatedAt)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export const ProjectCard = memo(
  ProjectCardBase,
  (prev, next) =>
    prev.project.id === next.project.id &&
    prev.project.updatedAt === next.project.updatedAt
);
