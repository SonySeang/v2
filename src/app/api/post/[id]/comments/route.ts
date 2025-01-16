import prisma from "@/lib/db";
import { CommentsPage, getCommentDataInclude } from "@/lib/include";
import { checkAuth } from "@/lib/server-util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const cursor = req.nextUrl.searchParams.get("cursor");
    const pageSize = 5;
    const session = await checkAuth();

    if (!session.user) {
      return Response.json("Unauthorized", { status: 401 });
    }
    const comment = await prisma.comment.findMany({
      where: { id: params.id },
      include: getCommentDataInclude(session.user.id),
      orderBy: { createAt: "asc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = comment.length > pageSize ? comment[0].id : null;
    const data: CommentsPage = {
      comments: comment.length > pageSize ? comment.slice(1) : comment,
      previousCursor,
    };
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json("Failed to fetch commentsnn", { status: 500 });
  }
}
