import React from "react";
import { Badge } from "@/components/ui/badge";

interface CommunityHeaderProps {
  name: string;
  creatorEmail: string;
  postCount: number;
}

export function CommunityHeader({
  name,
  creatorEmail,
  postCount,
}: CommunityHeaderProps) {
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
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {postCount} posts
        </Badge>
      </div>
    </div>
  );
}
