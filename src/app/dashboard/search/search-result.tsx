"use client";

import { PostCard } from "@/components/post-card";
import { PostsPage } from "@/lib/include";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["post-feed", "search", query],
      queryFn: ({ pageParam }) =>
        axios
          .get("/api/search", {
            params: {
              q: query,
              ...(pageParam ? { cursor: pageParam } : {}),
            },
          })
          .then((response) => response.data as PostsPage),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      gcTime: 0,
    });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No posts found for this query.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </div>
  );
}
