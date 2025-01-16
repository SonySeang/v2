"use client";
import Comments from "@/components/comment/comment";
import LikeButton from "@/components/like-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PostData } from "@/lib/include";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PostDetailProps {
  post: PostData;
}
export default function PostDetail({ post }: PostDetailProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={post?.user.image || ""}
            alt={post?.user.name || "User"}
          />
          <AvatarFallback>
            {post?.user.email ? post.user.email.split("@")[0] : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link
            href={`/dashboard/profile/${post.user.id}`}
            className="text-sm font-semibold hover:underline line-clamp-1"
          >
            {post?.user.email.split("@")[0] || "Anonymous"}
          </Link>
          <p className="text-xs text-muted-foreground">
            {post?.createdAt &&
              formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <h1 className="text-2xl font-bold">{post?.title}</h1>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {post?.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-2">
        <LikeButton
          id={post.id}
          initialState={{
            likes: post._count.like,
            isLikeByUser: post.like.some(
              (like) => like.userId === post.user.id
            ),
          }}
        />
        <CommentButton post={post} />
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </CardFooter>
      <CardContent className="h-full">
        <Comments post={post} />
      </CardContent>
    </Card>
  );
}

interface CommentProps {
  post: PostData;
}

function CommentButton({ post }: CommentProps) {
  return (
    <Button variant="ghost" size="sm">
      <MessageCircle className="w-4 h-4 mr-2" />
      {post._count.comments}
    </Button>
  );
}
