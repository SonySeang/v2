import React from "react";
import PostForm from "@/components/home/post-form";
import prisma from "@/lib/db";

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });
  return <PostForm actionType="edit" post={post || undefined} />;
}

export default Page;
