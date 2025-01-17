import ContentBlock from "@/components/content-block";
import FollowButton from "@/components/follow-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <ContentBlock className="w-[720px] border-2 border-gray-200 rounded-md">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center space-x-4 align-middle">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>
              {user.name ? user.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {user.name || user.email.split("@")[0]}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div>
            {user.id !== session.user.id && (
              <FollowButton
                userId={user?.id}
                initialState={{
                  followers: user._count.followers,
                  isFollowedByUser: user.followers.some(
                    ({ followerId }) => followerId === session.user.id
                  ),
                }}
              />
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-items-center  space-y-2 mt-2">
          <div className="ml-1 space-x-2">
            <Badge variant="secondary"> Follower </Badge>
            <Badge variant="outline">{user._count.followers}</Badge>
          </div>
          <div className="ml-1 space-x-2">
            <Badge variant="secondary" className="w-[72px]">
              {" "}
              Post{" "}
            </Badge>
            <Badge variant="outline">{user._count.posts}</Badge>
          </div>
        </div>
      </div>
    </ContentBlock>
  );
}
