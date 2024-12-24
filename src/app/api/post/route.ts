import { NextRequest, NextResponse } from "next/server";
import { createPostShema, postSchema } from "@/lib/validations";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate the request body
  const validation = createPostShema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { title, content, assigntoCommunityId } = body;

  if (assigntoCommunityId) {
    const communitys = await prisma.community.findUnique({
      where: {
        id: assigntoCommunityId,
      },
    });
    if (!communitys) {
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 }
      );
    }
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      communityId: assigntoCommunityId,
      User: {
        connect: {
          id: session.userId,
        },
      },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
