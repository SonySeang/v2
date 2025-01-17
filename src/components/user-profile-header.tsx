import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/follow-btn";
import { UserData } from "@/lib/include";

interface UserProfileHeaderProps {
  user: UserData;
  session: {
    user: { id: string };
  };
}

export function UserProfileHeader({ user, session }: UserProfileHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
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
        {user.id !== session.user.id && (
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followingId }) => followingId === session.user.id
              ),
            }}
          />
        )}
      </div>
    </div>
  );
}
