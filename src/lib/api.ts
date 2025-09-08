import axios, { AxiosResponse } from "axios";
import {
  Project,
  User,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./types";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Add request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `Making ${config.method?.toUpperCase()} request to ${config.url}`
      );
    }
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV !== "production") {
      console.error("Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An error occurred";

    // Handle timeout errors specifically
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      errorMessage =
        "Request timed out. The server may be busy. Please try again.";
    }
    // Handle network errors
    else if (error.code === "ERR_NETWORK") {
      errorMessage =
        "Network error. Please check your connection and try again.";
    }
    // Handle server response errors
    else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    // Handle other axios errors
    else if (error.message) {
      errorMessage = error.message;
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("API Error:", errorMessage, {
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      });
    }

    throw new Error(errorMessage);
  }
);

// API functions for projects using axios
export const projectsAPI = {
  // Fetch all projects
  getProjects: async (): Promise<Project[]> => {
    const response: AxiosResponse<{ data: Project[] }> = await apiClient.get(
      "/projects"
    );
    return response.data.data;
  },

  // Create new project
  createProject: async (
    projectData: CreateProjectRequest
  ): Promise<Project> => {
    const response: AxiosResponse<{ data: Project }> = await apiClient.post(
      "/projects",
      projectData
    );
    return response.data.data;
  },

  // Update existing project
  updateProject: async (
    projectData: UpdateProjectRequest
  ): Promise<Project> => {
    const payload = {
      name: projectData.name,
      status: projectData.status,
      dueDate: projectData.dueDate,
      assignedTo: projectData.assignedTo,
      summary: projectData.summary,
    };

    const response: AxiosResponse<{ data: Project }> = await apiClient.put(
      `/projects/${projectData.id}`,
      payload
    );
    return response.data.data;
  },

  // Delete project
  deleteProject: async (projectId: string): Promise<void> => {
    await apiClient.delete(`/projects/${projectId}`);
  },
};

// External axios instance for JSONPlaceholder
const externalApiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 15000, // 15 seconds timeout for external API
});

// Add error handling for external API
externalApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "Failed to fetch users";

    // Handle timeout errors specifically
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      errorMessage =
        "Request timed out while fetching user data. Please try again.";
    }
    // Handle network errors
    else if (error.code === "ERR_NETWORK") {
      errorMessage =
        "Network error while fetching user data. Please check your connection.";
    }
    // Handle server response errors
    else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    // Handle other errors
    else if (error.message) {
      errorMessage = `User data error: ${error.message}`;
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("External API Error:", errorMessage, {
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      });
    }

    throw new Error(errorMessage);
  }
);

// Interface for JSONPlaceholder user response
interface JSONPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Real API function for users (JSONPlaceholder) using axios
export const usersAPI = {
  getUsers: async (): Promise<User[]> => {
    const response: AxiosResponse<JSONPlaceholderUser[]> =
      await externalApiClient.get("/users");

    // Transform the data to match our User interface
    return response.data.map((user: JSONPlaceholderUser) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
  },
};
