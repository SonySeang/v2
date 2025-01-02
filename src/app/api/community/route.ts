import { NextRequest, NextResponse } from "next/server";
import { communitySchema } from "@/lib/validations";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = communitySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { name, categoryId } = body;

  if (categoryId) {
    const cate = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!cate) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
  }

  try {
    const community = await prisma.community.create({
      data: {
        name,
        categoryId,
      },
    });

    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create community" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const community = await prisma.community.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return NextResponse.json(community);
}
