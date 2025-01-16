import FollowButton from "@/components/follow-btn";
import prisma from "@/lib/db";
import { getUserDataSelect } from "@/lib/include";
import { checkAuth } from "@/lib/server-util";
import React from "react";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;

  const session = await checkAuth();
  if (!session) {
    return <h1>Unauthorized</h1>;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
      followers: {
        none: {
          followerId: session.user.id,
        },
      },
    },
    select: getUserDataSelect(session.user.id),
  });
  if (!user) {
    return <div>User not found!!</div>;
  }
  return (
    <div>
      <h1>{user?.email?.split("@")[0]}</h1>
      <FollowButton
        userId={user?.id}
        initialState={{
          followers: user._count.followers,
          isFollowedByUser: user.followers.some(
            ({ followerId }) => followerId === session.user.id
          ),
        }}
      />
    </div>
  );
}
