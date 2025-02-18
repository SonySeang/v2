import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/lib/validations";
import { checkAuth } from "@/lib/server-util";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const session = await checkAuth();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate the request body
    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const { title, content, communityId } = validation.data;

    if (communityId) {
      const community = await prisma.community.findUnique({
        where: {
          id: communityId,
        },
      });
      if (!community) {
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
        community: {
          connect: {
            id: communityId,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
