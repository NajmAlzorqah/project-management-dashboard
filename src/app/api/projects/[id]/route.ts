import { NextRequest, NextResponse } from "next/server";
import { Project, UpdateProjectRequest } from "@/lib/types";
import {
  findProject,
  updateProject,
  deleteProject as deleteProjectFromStore,
} from "@/lib/data-store";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// PUT /api/projects/[id] - Update an existing project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(200); // Minimal simulated delay

  try {
    const { id: projectId } = await params;
    const body: Omit<UpdateProjectRequest, "id"> = await request.json();

    // Simulate rare error (1% chance)
    if (Math.random() < 0.01) {
      return NextResponse.json(
        { error: "Failed to update project. Please try again." },
        { status: 500 }
      );
    }

    const existingProject = findProject(projectId);

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

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

    // Check if any data has actually changed
    const hasChanges =
      existingProject.name !== body.name ||
      existingProject.status !== body.status ||
      existingProject.dueDate !== body.dueDate ||
      existingProject.assignedTo !== body.assignedTo ||
      existingProject.summary !== body.summary;

    const updatedProjectData: Project = {
      ...existingProject,
      ...body,
      id: projectId,
      // Only update the timestamp if there are actual changes
      updatedAt: hasChanges
        ? new Date().toISOString()
        : existingProject.updatedAt,
    };

    updateProject(updatedProjectData);

    return NextResponse.json({ data: updatedProjectData });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(150); // Minimal simulated delay

  try {
    const { id: projectId } = await params;

    // Simulate rare error (0.5% chance)
    if (Math.random() < 0.005) {
      return NextResponse.json(
        { error: "Failed to delete project. Please try again." },
        { status: 500 }
      );
    }

    const deletedProject = deleteProjectFromStore(projectId);

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ data: deletedProject });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
