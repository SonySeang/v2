"use server";

import prisma from "@/lib/db";
import { getCommentDataInclude, PostData, PostDatas } from "@/lib/include";
import { checkAuth } from "@/lib/server-util";
import { createCommentSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function submitComments({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const session = await checkAuth();
  if (!session.user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: session.user.id,
      },
      include: getCommentDataInclude(session.user.id),
    }),
  ]);

  return newComment;
}

export async function deleteComment(id: string) {
  const session = await checkAuth();
  if (!session.user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const comment = await prisma.comment.findUnique({
    where: { id: id },
  });

  if (!comment) throw new Error("Comment not found");
  if (comment.userId !== session.user.id) throw new Error("Unauthorized");

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(session.user.id),
  });

  return deletedComment;
}
