import React from "react";
import PostForm from "@/components/home/post-form";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-util";

async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await checkAuth();

  if (!session.user) {
    return <h1>Unauthorized</h1>;
  }
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });
  return <PostForm actionType="edit" post={post || undefined} />;
}

export default Page;
