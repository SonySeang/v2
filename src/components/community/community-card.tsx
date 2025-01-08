import { CommunityData } from "@/lib/include";
import Link from "next/link";
import React from "react";

interface ComProps {
  community: CommunityData;
}

export default function Com({ community: community }: ComProps) {
  return (
    <div>
      <h1>{community.name}</h1>
      {community.posts.map((post) => (
        <div key={post.user.id}>
          <Link href={`/post/${post.user.id}`}></Link>
          <p>By: {post.user.name}</p>
        </div>
      ))}
    </div>
  );
}
