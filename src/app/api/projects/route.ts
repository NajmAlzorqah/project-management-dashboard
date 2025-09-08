import { NextRequest, NextResponse } from "next/server";
import { Project, CreateProjectRequest } from "@/lib/types";
import { getProjects, addProject } from "@/lib/data-store";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// GET /api/projects - Get all projects
export async function GET() {
  await delay(200); // Minimal simulated delay

  // Simulate rare error (1% chance)
  if (Math.random() < 0.01) {
    return NextResponse.json(
      { error: "Failed to fetch projects. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { data: getProjects() },
    {
      headers: {
        // Allow short-lived caching in browser/proxy; API data is also cached client-side via React Query
        "Cache-Control":
          "public, max-age=60, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  await delay(300); // Minimal simulated delay

  try {
    const body: CreateProjectRequest = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.status ||
      !body.dueDate ||
      !body.assignedTo ||
      !body.summary
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Simulate rare error (1% chance)
    if (Math.random() < 0.01) {
      return NextResponse.json(
        { error: "Failed to create project. Please try again." },
        { status: 500 }
      );
    }

    const newProject: Project = {
      ...body,
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addProject(newProject);

    return NextResponse.json({ data: newProject }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
