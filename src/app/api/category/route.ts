import prisma from "@/lib/db";
import { categorySchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = categorySchema.safeParse(body);

  const { name } = body;

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });
  return NextResponse.json(newCategory, { status: 201 });
}
