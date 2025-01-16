import prisma from "@/lib/db";
import { followerIdInfo } from "@/lib/include";
import { checkAuth } from "@/lib/server-util";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await checkAuth();
    const loggedInUserId = session.user.id;

    if (!loggedInUserId) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        followers: {
          where: { followerId: loggedInUserId },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json("User not found", { status: 404 });
    }

    const data: followerIdInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json("Failed to fetch commentsnn", { status: 500 });
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await checkAuth();
    const loggedInUserId = session.user.id;

    if (!loggedInUserId) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return Response.json("User not found", { status: 404 });
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUserId,
          followingId: user.id,
        },
      },
      create: {
        followerId: loggedInUserId,
        followingId: user.id,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json("Failed to follow user", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await checkAuth();
    const loggedInUserId = session.user.id;

    if (!loggedInUserId) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return Response.json("User not found", { status: 404 });
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUserId,
        followingId: user.id,
      },
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json("Failed to unfollow user", { status: 500 });
  }
}
