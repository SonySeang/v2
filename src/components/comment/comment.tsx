"use client";
import React from "react";
import { CommentsPage, PostData } from "@/lib/include";
import CommentsForm from "./comment-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import CommentList from "./comments-list";

interface CommentProps {
  post: PostData;
}

export default function Comments({ post }: CommentProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        axios
          .get(
            `/api/post/${post.id}/comments`,
            pageParam ? { params: { cursor: pageParam } } : {}
          )
          .then((response) => response.data as CommentsPage),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });
  const comments = data?.pages.flatMap((page) => page.comments) || [];
  return (
    <div>
      <CommentsForm post={post} />
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentList key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
