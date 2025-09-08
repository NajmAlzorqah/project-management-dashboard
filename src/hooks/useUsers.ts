import { useQuery } from "@tanstack/react-query";
import { usersAPI } from "@/lib/api";

// Query keys for consistent caching
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
};

// Hook to fetch all users from JSONPlaceholder
export const useUsers = () => {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: usersAPI.getUsers,
    staleTime: 1000 * 60 * 10, // Consider data fresh for 10 minutes (users don't change often)
    refetchOnWindowFocus: false,
    retry: 3, // Retry 3 times on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Hook to find a user by ID (derived from the users query)
export const useUser = (userId: number) => {
  const { data: users, ...query } = useUsers();

  const user = users?.find((user) => user.id === userId);

  return {
    ...query,
    data: user,
  };
};

// Hook to get user options for select components
export const useUserOptions = () => {
  const { data: users, isLoading, error } = useUsers();

  const options =
    users?.map((user) => ({
      value: user.id,
      label: user.name,
      email: user.email,
    })) ?? [];

  return {
    options,
    isLoading,
    error,
  };
};
