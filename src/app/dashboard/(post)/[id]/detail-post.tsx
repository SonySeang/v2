import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-select";
import { formatDistanceToNow } from "date-fns";
import {

  ThumbsUp,
  MessageCircle,
  Share2,

} from "lucide-react";
import React from "react";

interface PostDetailProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    community: {
      id: string;
      name: string;
    };
    // comments: {
    //   id: string;
    //   content: string;
    //   createdAt: Date;
    //   User: {
    //     id: string;
    //     name: string | null;
    //     image: string | null;
    //   };
    // }[];
    // _count: {
    //   likes: number;
    //   comments: number;
    // };
  };
}
export default async function PostDetail({ post }: PostDetailProps) {
  return (
    
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={post?.user.image || ""}
            alt={post?.user.name || "User"}
          />
          <AvatarFallback>
            {post?.user.name ? post.user.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {post?.user.name || "Anonymous"}
          </p>
          <p className="text-xs text-muted-foreground">
            {post?.createdAt &&
              formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h1 className="text-2xl font-bold">{post?.title}</h1>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {post?.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm">
          <ThumbsUp className="w-4 h-4 mr-2" />
          {/* {post._count.likes} */}like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {/* {post._count.comments} */}comment
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </CardFooter>
      <Separator className="my-4" />
      <CardContent>
        {/* <form onSubmit={handleCommentSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" disabled={!newComment.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Post Comment
          </Button>
        </form> */}
      </CardContent>
    </Card>
  );
}
