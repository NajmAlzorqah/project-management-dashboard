# 🚀 Project Management Dashboard - Comprehensive Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Design](#architecture--design)
4. [File Structure](#file-structure)
5. [Features & Functionality](#features--functionality)
6. [API Endpoints](#api-endpoints)
7. [Components Documentation](#components-documentation)
8. [State Management](#state-management)
9. [Data Flow](#data-flow)
10. [JSONPlaceholder Integration](#jsonplaceholder-integration)
11. [Validation System](#validation-system)
12. [Setup & Installation](#setup--installation)
13. [Usage Guide](#usage-guide)
14. [Code Organization](#code-organization)
15. [Design Decisions](#design-decisions)
16. [Testing Strategy](#testing-strategy)
17. [Deployment](#deployment)
18. [Troubleshooting](#troubleshooting)
19. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

**Project Management Dashboard** is a modern, full-stack web application built with Next.js 15, TypeScript, and React Query. It provides a comprehensive solution for managing projects, team assignments, and tracking progress with real-time updates and optimistic UI patterns.

### Key Highlights:

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete projects
- ✅ **Real-time UI Updates**: Optimistic updates with automatic rollback
- ✅ **Professional UI**: Built with shadcn/ui components
- ✅ **Type-safe**: Full TypeScript coverage
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Data Persistence**: API-based architecture with in-memory storage
- ✅ **Team Management**: Integration with JSONPlaceholder for user data

---

## 🛠 Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern, accessible UI components
- **Lucide React**: Beautiful icon library
- **date-fns**: Date manipulation and formatting

### State Management & Data Fetching

- **React Query (@tanstack/react-query)**: Server state management
- **React Hook Form**: Form state management
- **Zod**: Schema validation and type inference

### Development Tools

- **ESLint**: Code linting and quality
- **pnpm**: Fast, disk space efficient package manager
- **Turbopack**: Fast bundler for Next.js

### Notifications & UX

- **Sonner**: Beautiful toast notifications

---

## 🏗 Architecture & Design

### Architecture Patterns

1. **Component-Based Architecture**: Reusable, composable components
2. **API-First Design**: RESTful API endpoints
3. **Optimistic Updates**: Immediate UI feedback
4. **Server State Separation**: Clear distinction between server and client state
5. **Type-Driven Development**: TypeScript throughout the stack

### Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Composition over Inheritance**: Flexible component composition
- **Data Co-location**: Data fetching near components that use it
- **Error Boundaries**: Graceful error handling at multiple levels
- **Accessibility First**: WCAG compliant UI components

---

## 📁 File Structure

```
project-management-dashboard/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   └── projects/             # Project API endpoints
│   │   │       ├── route.ts          # GET, POST /api/projects
│   │   │       └── [id]/             # Dynamic route for specific project
│   │   │           └── route.ts      # PUT, DELETE /api/projects/[id]
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Main dashboard page
│   │   └── providers/                # Context providers
│   │       └── QueryProvider.tsx    # React Query provider
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── alert-dialog.tsx      # Delete confirmation dialog
│   │   │   ├── badge.tsx             # Status badges
│   │   │   ├── button.tsx            # Interactive buttons
│   │   │   ├── calendar.tsx          # Date picker calendar
│   │   │   ├── card.tsx              # Content containers
│   │   │   ├── date-picker.tsx       # Custom date picker component
│   │   │   ├── dialog.tsx            # Modal dialogs
│   │   │   ├── form.tsx              # Form components
│   │   │   ├── input.tsx             # Text inputs
│   │   │   ├── label.tsx             # Form labels
│   │   │   ├── popover.tsx           # Popover components
│   │   │   ├── select.tsx            # Dropdown selects
│   │   │   └── textarea.tsx          # Multi-line text inputs
│   │   ├── AddProjectModal.tsx       # Modal for creating new projects
│   │   ├── EditProjectModal.tsx      # Modal for editing projects
│   │   ├── ProjectCard.tsx           # Individual project display card
│   │   ├── ProjectForm.tsx           # Reusable project form
│   │   └── ProjectList.tsx           # List of all projects
│   ├── hooks/                        # Custom React hooks
│   │   ├── useProjects.ts            # Project data management hooks
│   │   ├── useUsers.ts               # User data fetching hooks
│   │   └── use-toast.ts              # Toast notification hook
│   ├── lib/                          # Utility libraries
│   │   ├── api.ts                    # API client functions
│   │   ├── data-store.ts             # Shared in-memory data store
│   │   ├── types.ts                  # TypeScript type definitions
│   │   ├── utils.ts                  # Utility functions
│   │   └── validations.ts            # Zod validation schemas
│   └── ...
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies and scripts
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## ✨ Features & Functionality

### Core Features

#### 1. Project Management

- **Create Projects**: Add new projects with full validation
- **View Projects**: Browse all projects in a responsive grid layout
- **Update Projects**: Edit existing project details
- **Delete Projects**: Remove projects with confirmation dialog
- **Search & Filter**: Find projects by name or filter by status

#### 2. Team Assignment

- **User Integration**: Fetch team members from JSONPlaceholder API
- **Assignment**: Assign projects to specific team members
- **User Details**: Display team member names and emails

#### 3. Status Tracking

- **Status Management**: Track projects as To-Do, In Progress, or Completed
- **Visual Indicators**: Color-coded status badges
- **Progress Overview**: Status-based filtering and counting

#### 4. Date Management

- **Due Date Tracking**: Set and track project deadlines
- **Calendar Interface**: Beautiful date picker with shadcn/ui
- **Overdue Detection**: Visual indicators for overdue projects
- **Smart Validation**: Different validation rules for create vs update

#### 5. Real-time Updates

- **Optimistic Updates**: Immediate UI feedback
- **Automatic Rollback**: Revert changes on server errors
- **Cache Management**: Intelligent data synchronization

### Advanced Features

#### 1. Data Persistence

- **API-based Storage**: RESTful endpoints for data operations
- **Session Persistence**: Data survives page refreshes
- **Error Recovery**: Graceful handling of network issues

#### 2. User Experience

- **Loading States**: Skeleton loaders during data fetching
- **Error States**: User-friendly error messages
- **Toast Notifications**: Success and error feedback
- **Responsive Design**: Works on all screen sizes

#### 3. Form Management

- **Real-time Validation**: Immediate feedback on form errors
- **Type Safety**: Full TypeScript integration
- **Field Dependencies**: Smart validation based on context

---

## 🔌 API Endpoints

### Base URL: `/api/projects`

#### 1. Get All Projects

```http
GET /api/projects
```

**Response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Website Redesign",
      "status": "In Progress",
      "dueDate": "2024-03-15",
      "assignedTo": 1,
      "summary": "Complete redesign of company website",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-02-01T10:00:00Z"
    }
  ]
}
```

#### 2. Create New Project

```http
POST /api/projects
```

**Request Body:**

```json
{
  "name": "New Project",
  "status": "To-Do",
  "dueDate": "2024-06-01",
  "assignedTo": 2,
  "summary": "Project description here"
}
```

#### 3. Update Project

```http
PUT /api/projects/[id]
```

**Request Body:** Same as POST, excluding `id`

#### 4. Delete Project

```http
DELETE /api/projects/[id]
```

### Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Server Error

---

## 🧩 Components Documentation

### Core Components

#### 1. ProjectCard

**File**: `src/components/ProjectCard.tsx`
**Purpose**: Displays individual project information in a card format

**Props:**

```typescript
interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}
```

**Features:**

- Status badges with color coding
- Overdue indicators
- Edit and delete buttons
- User information display
- Creation and update timestamps

#### 2. ProjectForm

**File**: `src/components/ProjectForm.tsx`
**Purpose**: Reusable form for creating and editing projects

**Props:**

```typescript
interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormValues | UpdateProjectFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
}
```

**Features:**

- React Hook Form integration
- Zod validation
- Conditional validation (create vs update)
- Custom date picker
- User selection dropdown
- Real-time validation feedback

#### 3. ProjectList

**File**: `src/components/ProjectList.tsx`
**Purpose**: Main container for displaying and managing projects

**Props:**

```typescript
interface ProjectListProps {
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}
```

**Features:**

- Grid layout with responsive design
- Search functionality
- Status-based filtering
- Loading states with skeletons
- Error states with retry options
- Empty states

#### 4. Modal Components

- **AddProjectModal**: Handles new project creation
- **EditProjectModal**: Manages project updates
- Both use the shared ProjectForm component

### UI Components (shadcn/ui)

#### DatePicker

**File**: `src/components/ui/date-picker.tsx`
**Purpose**: Custom date picker with calendar popup

**Features:**

- Calendar interface
- Date validation
- Minimum date restrictions
- Accessible design

---

## 📊 State Management

### React Query Implementation

#### Query Keys

```typescript
export const projectsKeys = {
  all: ["projects"] as const,
  lists: () => [...projectsKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...projectsKeys.lists(), { filters }] as const,
  details: () => [...projectsKeys.all, "detail"] as const,
  detail: (id: string) => [...projectsKeys.details(), id] as const,
};
```

#### Custom Hooks

##### useProjects

```typescript
export const useProjects = () => {
  return useQuery({
    queryKey: projectsKeys.lists(),
    queryFn: projectsAPI.getProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
```

##### useCreateProjectOptimistic

- Implements optimistic updates for project creation
- Immediate UI feedback
- Automatic rollback on errors
- Cache invalidation

##### useUpdateProjectOptimistic

- Optimistic updates for project modifications
- Smart timestamp management (only updates when data changes)
- Error recovery

### Form State Management

#### React Hook Form + Zod

```typescript
const form = useForm<ProjectFormValues>({
  resolver: zodResolver(projectFormSchema),
  defaultValues: {
    name: "",
    status: "To-Do",
    dueDate: "",
    assignedTo: 0,
    summary: "",
  },
});
```

---

## 🔄 Data Flow

### 1. Project Creation Flow

```
User Input → Form Validation → Optimistic Update → API Call → Success/Error Handling
```

1. **User Input**: User fills out the project form
2. **Client Validation**: Zod schema validates input
3. **Optimistic Update**: UI immediately shows new project
4. **API Call**: POST to `/api/projects`
5. **Response Handling**: Update cache with server response or rollback

### 2. Project Update Flow

```
Edit Click → Form Pre-population → User Changes → Change Detection → API Update
```

1. **Edit Trigger**: User clicks edit button
2. **Form Loading**: Form pre-populated with existing data
3. **Change Detection**: System compares original vs modified data
4. **Conditional Update**: Only updates timestamp if data changed
5. **UI Synchronization**: Cache updated with latest data

### 3. Project Deletion Flow

```
Delete Click → Confirmation → Optimistic Removal → API Call → Confirmation
```

1. **Delete Trigger**: User clicks delete button
2. **Confirmation**: AlertDialog asks for confirmation
3. **Optimistic Removal**: Project immediately removed from UI
4. **API Call**: DELETE request to server
5. **Final Confirmation**: Toast notification confirms deletion

---

## 👥 JSONPlaceholder Integration

### User Data Fetching

#### Implementation

```typescript
export const usersAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    return users.map((user: any) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
  },
};
```

#### How It Works

1. **API Call**: Fetches user data from JSONPlaceholder
2. **Data Transformation**: Maps response to our User interface
3. **Caching**: React Query caches user data for 10 minutes
4. **Error Handling**: Graceful fallback for network issues

#### Usage in Components

```typescript
// Hook for getting user options in selects
export const useUserOptions = () => {
  const { data: users, isLoading, error } = useUsers();

  const options =
    users?.map((user) => ({
      value: user.id,
      label: user.name,
      email: user.email,
    })) ?? [];

  return { options, isLoading, error };
};
```

#### User Display

- **Project Cards**: Show assigned user's name
- **Form Selects**: Display user name and email
- **Loading States**: Skeleton loaders while fetching
- **Error Handling**: Fallback messages for failed requests

---

## ✅ Validation System

### Schema-Based Validation with Zod

#### Project Creation Schema

```typescript
export const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters")
    .trim(),

  status: z.enum(["To-Do", "In Progress", "Completed"]),

  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
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
```

#### Update Schema (More Permissive)

```typescript
export const updateProjectFormSchema = z.object({
  // Same as above but without future date restriction
  dueDate: z.string().min(1, "Due date is required"),
  // ... other fields same as create schema
});
```

### Validation Features

1. **Real-time Validation**: Immediate feedback on form fields
2. **Context-Aware**: Different rules for create vs update
3. **Type Safety**: TypeScript inference from schemas
4. **User-Friendly Messages**: Clear, actionable error messages
5. **Server-Side Validation**: API endpoints also validate data

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js 18+**: JavaScript runtime
- **pnpm**: Package manager (preferred)

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd project-management-dashboard
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Development Server**
   ```bash
   pnpm dev
   ```
4. **Build for Production**

   ```bash
   pnpm build
   ```

5. **Start Production Server**
   ```bash
   pnpm start
   ```

### Available Scripts

- `pnpm dev`: Start development server with Turbopack
- `pnpm build`: Build optimized production bundle
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint for code quality

### Environment Setup

No environment variables required for basic setup. The application uses:

- JSONPlaceholder for user data (public API)
- In-memory storage for projects (no database needed)

---

## 📖 Usage Guide

### Creating a New Project

1. Click the **"Add Project"** button
2. Fill out the form fields:
   - **Project Name**: Descriptive project title
   - **Status**: Choose from To-Do, In Progress, or Completed
   - **Due Date**: Select using the calendar picker
   - **Team Member**: Choose from dropdown list
   - **Summary**: Brief project description
3. Click **"Create Project"**
4. Project appears immediately in the list

### Editing a Project

1. Click the **edit icon** (pencil) on any project card
2. Modify the desired fields
3. Click **"Update Project"**
4. Changes reflect immediately
5. Update timestamp only changes if data is modified

### Deleting a Project

1. Click the **delete icon** (trash) on any project card
2. Confirm deletion in the dialog
3. Project is removed immediately
4. Action is confirmed with a toast notification

### Searching and Filtering

1. **Search**: Use the search box to find projects by name or summary
2. **Filter**: Use the status dropdown to filter by project status
3. **Counts**: See project counts by status in the filter dropdown

---

## 🏛 Code Organization

### Separation of Concerns

#### 1. Components (`src/components/`)

- **Presentation Logic**: How things look
- **User Interactions**: Event handlers
- **Composition**: Combining smaller components

#### 2. Hooks (`src/hooks/`)

- **Data Fetching**: Server state management
- **Business Logic**: Data transformations
- **State Management**: Client state handling

#### 3. API Layer (`src/lib/api.ts`)

- **HTTP Requests**: API communication
- **Error Handling**: Network error management
- **Data Transformation**: Response formatting

#### 4. Types (`src/lib/types.ts`)

- **Interface Definitions**: TypeScript contracts
- **Type Safety**: Compile-time checking
- **Documentation**: Self-documenting code

#### 5. Validation (`src/lib/validations.ts`)

- **Schema Definitions**: Data validation rules
- **Type Inference**: Automatic type generation
- **Error Messages**: User-friendly feedback

### Design Patterns Used

#### 1. Compound Components

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

#### 2. Custom Hooks Pattern

```typescript
const useProjects = () => {
  // Logic encapsulated in hook
  return { data, isLoading, error, refetch };
};
```

#### 3. Render Props / Children Pattern

```typescript
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Delete</Button>
  </AlertDialogTrigger>
</AlertDialog>
```

---

## 🎨 Design Decisions

### Why These Technologies?

#### Next.js 15

- **App Router**: Modern routing with layouts
- **Server Components**: Better performance
- **API Routes**: Full-stack in one framework
- **TypeScript**: Built-in support

#### React Query

- **Server State**: Specialized for API data
- **Caching**: Intelligent background updates
- **Optimistic Updates**: Better user experience
- **Error Boundaries**: Graceful error handling

#### shadcn/ui

- **Accessibility**: WCAG compliant components
- **Customization**: Tailwind-based styling
- **Consistency**: Design system approach
- **Developer Experience**: Great TypeScript support

#### Zod

- **Type Safety**: Schema-first validation
- **Runtime Validation**: Catch errors at runtime
- **Error Messages**: Customizable feedback
- **TypeScript Integration**: Automatic type inference

### Architectural Decisions

#### 1. Component Co-location

- Keep related files together
- Easier maintenance and discovery
- Clear ownership and boundaries

#### 2. Custom Hooks for Logic

- Reusable business logic
- Easier testing
- Separation of concerns

#### 3. Optimistic Updates

- Better perceived performance
- Immediate user feedback
- Graceful error recovery

#### 4. Type-First Development

- Catch errors at compile time
- Better developer experience
- Self-documenting code

---

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

This creates an optimized production build with:

- Static generation for pages
- Code splitting
- Asset optimization
- TypeScript compilation

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Benefits:**

- Optimized for Next.js
- Automatic deployments
- Edge functions
- Built-in analytics


#### 2. Self-Hosted

```bash
pnpm build
pnpm start
```

### Environment Considerations

- No environment variables needed
- Works with static hosting
- API routes require Node.js environment

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Errors

**Problem**: TypeScript compilation errors
**Solution**:

```bash
# Check types
npx tsc --noEmit

# Fix linting issues
pnpm lint --fix
```

#### 2. API Connection Issues

**Problem**: Cannot fetch users from JSONPlaceholder
**Solution**:

- Check internet connection
- Verify API endpoint is accessible
- Check browser network tab for errors

#### 3. Date Picker Issues

**Problem**: Date picker not working on mobile
**Solution**:

- Ensure proper touch event handling
- Check viewport meta tag
- Test on actual devices

#### 4. Form Validation Not Working

**Problem**: Zod validation errors
**Solution**:

- Check schema definitions
- Verify form field names match schema
- Enable React Hook Form dev tools

### Debug Mode

Enable React Query devtools:

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Add to your app
<ReactQueryDevtools initialIsOpen={false} />;
```

---

## 🔮 Future Enhancements

### Short-term Improvements

1. **Advanced Filtering**

   - Date range filters
   - Multiple status selection
   - User-based filtering

2. **Bulk Operations**

   - Select multiple projects
   - Bulk status updates
   - Bulk deletion

3. **Enhanced UI**
   - Dark mode toggle
   - Customizable themes
   - Better mobile experience

### Medium-term Features

1. **Real Database Integration**

   - PostgreSQL or MongoDB
   - Data persistence across sessions
   - Better performance

2. **User Authentication**

   - Login/logout functionality
   - User-specific projects
   - Role-based permissions

3. **File Attachments**

   - Upload project files
   - Image attachments
   - Document management

4. **Advanced Analytics**
   - Project completion rates
   - Time tracking
   - Progress charts

### Long-term Vision

1. **Real-time Collaboration**

   - WebSocket integration
   - Live updates across users
   - Collaborative editing

2. **Mobile App**

   - React Native implementation
   - Offline synchronization
   - Push notifications

3. **Integration Ecosystem**

   - GitHub integration
   - Slack notifications
   - Calendar synchronization

4. **Advanced Project Management**
   - Gantt charts
   - Dependencies between projects
   - Resource allocation

---

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Zod Documentation](https://zod.dev/)
