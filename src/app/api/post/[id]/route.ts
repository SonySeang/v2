import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { postSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // Parse the request body
    const body = await request.json();
    const validation = postSchema.safeParse(body);

    // Validate the input data
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 } // Bad Request
      );
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 } // Not Found
      );
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 } // Not Found
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
