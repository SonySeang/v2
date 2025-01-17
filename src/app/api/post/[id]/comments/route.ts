import { NextRequest, NextResponse } from "next/server";

import { checkAuth } from "@/lib/server-util";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const cursor = req.nextUrl.searchParams.get("cursor");
    const pageSize = 5;

    let session;
    try {
      session = await checkAuth();
    } catch (error: any) {
      if (error.digest && error.digest.startsWith("NEXT_REDIRECT")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      throw error;
    }

    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId: params.id },
      include: {
        user: true,
      },
      orderBy: { createAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor =
      comments.length > pageSize ? comments[pageSize].id : null;
    const data = {
      comments: comments.slice(0, pageSize),
      previousCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
