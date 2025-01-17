import prisma from "@/lib/db";
import { getPostDataInclude, PostsPage } from "@/lib/include";
import { checkAuth } from "@/lib/server-util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = q.split(" ").join(" & ");
    const pageSize = 5;

    const session = await checkAuth();
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
            },
          },
          //   {
          //     user: {
          //       email: {
          //         contains: searchQuery,
          //       },
          //     },
          //   },
          //   {
          //     content: {
          //       contains: searchQuery,
          //     },
          //   }
        ],
      },
      include: getPostDataInclude(session.user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
