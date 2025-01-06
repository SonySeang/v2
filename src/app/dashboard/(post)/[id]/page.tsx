import React from "react";
import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PostButton from "@/app/dashboard/_components/post-button";
import PostDelete from "@/components/post-delete";

interface DeletePostProps {
  params: { id: string };
}

async function DetailPost({ params }: DeletePostProps) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="w-500px">
      <h1>Post detail</h1>
      <Card>
        <CardHeader>{post?.userId}</CardHeader>
        <CardContent>
          <div>Title: {post?.title}</div>
          <div>Description: {post?.content}</div>
        </CardContent>
        <CardFooter>
          <PostButton actionType="edit" params={post.id} />
          {/*<Button onClick={async () => await deletePost(post.id)}>delete post</Button>*/}
          <PostDelete postId={post.id} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default DetailPost;
