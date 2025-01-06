import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Post } from "@prisma/client";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getPostById(postId: Post["id"]) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
}
