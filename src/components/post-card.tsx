"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PostCardProps } from "@/lib/types";

export function PostCard({ post }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={post.user.image || ""}
            alt={post.user.name || "User"}
          />
          <AvatarFallback>
            {post.user.name ? post.user.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {post.user.name || "Anonymous"}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {post.community.name}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p
          className={`text-muted-foreground ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {post.content}
        </p>
        {post.content.length > 150 && (
          <Button
            variant="link"
            onClick={toggleExpand}
            className="p-0 h-auto font-semibold"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="w-4 h-4 mr-2" />
          {/* {post._count.likes} */} like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {/* {post._count.comments} */} comment 
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
