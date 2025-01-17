"use client";
import ContentBlock from "@/components/content-block";
import { PostCard } from "@/components/post-card";
import { PostsPage } from "@/lib/include";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function Following() {
  const { data, fetchNextPage, status } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: ({ pageParam }) =>
      axios
        .get(
          "/api/post/following ",
          pageParam ? { params: { cursor: pageParam } } : {}
        )
        .then((response) => response.data as PostsPage),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching posts</div>;

  if (posts.length === 0) {
    return <div className="text-center">You haven't Follow Anyone Yet</div>;
  }

  return (
    <ContentBlock className=" w-[720px]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ContentBlock>
  );
}
