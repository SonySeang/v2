import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-util";
import { categorySchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = categorySchema.safeParse(body);
  const { name } = body;

  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
      User: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });
  return NextResponse.json(newCategory, { status: 201 });
}

export async function GET() {
  const categorys = await prisma.category.findMany({
    include: {
      communities : true,
    },
  });
  return NextResponse.json(categorys, { status: 200 });
}
