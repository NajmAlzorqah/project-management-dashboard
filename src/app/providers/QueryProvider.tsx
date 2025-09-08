"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";

const Devtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then((m) => m.ReactQueryDevtools),
  { ssr: false, loading: () => null }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: (
        failureCount,
        error: Error & { response?: { status?: number } }
      ) => {
        // Don't retry timeout errors more than once
        if (
          error?.message?.includes("timeout") ||
          error?.message?.includes("timed out")
        ) {
          return failureCount < 1;
        }
        // Don't retry 4xx errors
        if (
          error?.response?.status &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          return false;
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff with 10s max
    },
    mutations: {
      retry: (
        failureCount,
        error: Error & { response?: { status?: number } }
      ) => {
        // Don't retry timeout errors for mutations
        if (
          error?.message?.includes("timeout") ||
          error?.message?.includes("timed out")
        ) {
          return false;
        }
        // Don't retry 4xx errors
        if (
          error?.response?.status &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          return false;
        }
        // Retry 5xx errors once
        return failureCount < 1;
      },
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== "production" && (
        <Devtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
