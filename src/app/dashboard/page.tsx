import React from "react";
import ContentBlock from "@/components/content-block";
import RecentlyPost from "@/components/home/recently-post";

import prisma from "@/lib/db";
import { postDataInclude } from "@/lib/include";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { PostCard } from "@/components/post-card";

async function Page() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
  });
  return (
    <div className="grid grid-cols-3">
      <div className="col-start-1 col-span-2">
        <ContentBlock className="m-2">
          {/* <PostCard /> */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                href={`/dashboard/${post.id}`}
                key={post.id}
                className="block mb-4"
              >
                <PostCard post={post} />
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No posts yet. Be the first to create one!
              </p>
              <Button asChild>
                <Link href="/post/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Post
                </Link>
              </Button>
            </div>
          )}
        </ContentBlock>
      </div>
      <div className="col-start-3 col-span-1 ">
        <ContentBlock className=" bg-blue-400 border-2 ml-2 mt-2">
          <RecentlyPost />
        </ContentBlock>
      </div>
    </div>
  );
}

export default Page;
