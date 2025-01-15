import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { communitySchema } from "@/lib/validations";
import { checkAuth } from "@/lib/server-util";
import { communityDataInclude } from "@/lib/include";



export async function POST(request: NextRequest) {
  const session = await checkAuth();
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to create community" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await checkAuth();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const communities = await prisma.community.findMany({
      include: communityDataInclude,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(communities);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch communities" },
      { status: 500 }
    );
  }
}
