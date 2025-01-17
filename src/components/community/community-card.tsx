"use client";
import React, { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MessageCircle, Share2 } from "lucide-react";
import LikeButton from "../like-button";
import { PostData } from "@/lib/include";
import { useRouter } from "next/navigation";

interface CommunityCardProps {
  post: PostData;
}

export function CommunityCard({ post }: CommunityCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="overflow-hidden">
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
            {post.user.email.split("@")[0]}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          {post.community.name}
        </Badge>
      </CardHeader>
      <CardContent
        className="space-y-2 hover:bg-gray-100 transition-colors duration-200"
        onClick={() => router.push(`/dashboard/${post.id}`)}
      >
        <p className="text-lg font-semibold">{post.title}</p>
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
        <LikeButton
          id={post.id}
          initialState={{
            likes: post._count.like,
            isLikeByUser: post.like.some(
              (like) => like.userId === post.user.id
            ),
          }}
        />
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Comment
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
