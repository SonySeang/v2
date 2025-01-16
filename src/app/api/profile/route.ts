import prisma from "@/lib/db";
import { getPostDataInclude, PostDatas, PostsPage } from "@/lib/include";
import { checkAuth } from "@/lib/server-util";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const session = await checkAuth();
    const pageSize = 10;

    if (!session.user) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const post = await prisma.post.findMany({
      where: {
        user: { id: session.user.id },
      },
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
      include: getPostDataInclude(session.user.id),
      take: pageSize + 1,
    });

    const data: PostsPage = {
      posts: post.slice(0, pageSize),
      nextCursor: post.length > pageSize ? post[pageSize].id : null,
    };
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json("Failed to fetch posts", { status: 500 });
  }
}
