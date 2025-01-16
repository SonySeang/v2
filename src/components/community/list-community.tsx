"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { CommunityData } from "@/lib/include";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ListCommunity() {
  const router = useRouter();
  const {
    data: communities,
    error,
    isLoading,
  } = useQuery<CommunityData[]>({
    queryKey: ["community-list", "for-you"],
    queryFn: async () =>
      await axios.get("/api/community").then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading communities</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 m-5">
      {communities?.map((community) => {
        
        const uniqueUsers = new Set(community.posts.map((post) => post.user.id))
          .size;
        return (
          <Card
            key={community.id}
            className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
            onClick={() => {
              router.push(`/dashboard/community/list/${community.id}`);
            }}
          >
            <CardHeader>
              <CardTitle>{community.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <p>Posts: {community.posts.length}</p>
              <p>Follower : {uniqueUsers}</p>
              <Link href={`/dashboard/community/list/${community.id}`}>
                Click here
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
