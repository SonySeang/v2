import { CommunityData } from "@/lib/include";
import Link from "next/link";
import React from "react";

interface ComProps {
  test: CommunityData;
}

export default function Com({ test }: ComProps) {
  return (
    <div>
      <article>{test.name}</article>
      <h1>
        {test.posts.map((post) => (
          <Link key={post.user.name} href={`/post/${post.user.name}`}>
            {post.user.name}
          </Link>
        ))}
      </h1>
      {/* <h1>
        {test.posts.map((post) => (
          <Link key={post.id} href={`/post/${post.user.id}`}>
            {post.title}
          </Link>
        ))}
      </h1> */}
    </div>
  );
}
