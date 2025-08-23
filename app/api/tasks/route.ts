
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create task
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, status } = body;

    const newTask = await prisma.task.create({
      data: { title, description, status },
    });

    return NextResponse.json(newTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



