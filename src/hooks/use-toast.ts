import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    const message = title || description || "";
    const fullMessage =
      title && description ? `${title}\n${description}` : message;

    if (variant === "destructive") {
      sonnerToast.error(fullMessage);
    } else {
      sonnerToast.success(fullMessage);
    }
  };

  return { toast };
};
