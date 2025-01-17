import React, { use } from "react";
import { Badge } from "@/components/ui/badge";
import DotCommunity from "./dot-community";
import { checkAuth } from "@/lib/server-util";
import { Community } from "@prisma/client";

interface CommunityHeaderProps {
  name: string;
  creatorEmail: string;
  postCount: number;
  categoryName: string;
  communityId: { id: string };
  community: Community;
}

export async function CommunityHeader({
  name,
  creatorEmail,
  postCount,
  categoryName,
  communityId,
  community,
}: CommunityHeaderProps) {
  const session = await checkAuth();
  if (!session) {
    return null;
  }
  
  const canSee = community.userId === session.user.id;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
          <p>
            Created by{" "}
            <span className="font-semibold">{creatorEmail.split("@")[0]}</span>
          </p>
        </div>
        {canSee && <DotCommunity data={communityId} />}
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {categoryName}
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {postCount} posts
        </Badge>
      </div>
    </div>
  );
}
