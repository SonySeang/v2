import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-util";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // Await params
    const session = await checkAuth();
    if (!session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        like: {
          where: {
            userId: session.user.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            like: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post likes:", error);
    return new NextResponse("Failed to fetch post likes", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // Await params
    const session = await checkAuth();
    if (!session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.like.upsert({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.id,
        },
      },
      create: {
        userId: session.user.id,
        postId: params.id,
      },
      update: {},
    });

    return NextResponse.json(
      { message: "Post liked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params; // Await params
    const session = await checkAuth();
    if (!session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.id,
        },
      },
    });

    return NextResponse.json(
      { message: "Post unliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unliking post:", error);
    return NextResponse.json(
      { error: "Failed to unlike post" },
      { status: 500 }
    );
  }
}
