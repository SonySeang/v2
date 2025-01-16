import prisma from "@/lib/db";
import {
  getPostDataInclude,
  PostData,
  PostDatas,
  PostsPage,
} from "@/lib/include";
import { checkAuth } from "@/lib/server-util";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const curosr = req.nextUrl.searchParams.get("cursor");

    const pageSize = 10;
    const session = await checkAuth();
    const loggedInUserId = session.user.id;
    if (!loggedInUserId) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: loggedInUserId,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: curosr ? { id: curosr } : undefined,
      include: getPostDataInclude(loggedInUserId),
    });

    const nextCursor =
      posts.length > pageSize ? posts[posts.length - 1].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json("Failed to fetch commentsnn", { status: 500 });
  }
}
