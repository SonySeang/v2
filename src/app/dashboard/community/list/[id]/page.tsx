import React from "react";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-util";
import ContentBlock from "@/components/content-block";
import { CommunityHeader } from "@/components/community/community-header";
import { CommunityCard } from "@/components/community/community-card";

interface CommunityPageProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityPage(props: CommunityPageProps) {
  const params = await props.params;
  const { id } = params;
  await checkAuth();

  const community = await prisma.community.findUnique({
    where: { id },
    include: {
      posts: {
        include: {
          user: true,
          like: true,
          _count: {
            select: {
              like: true,
            },
          },
        },
      },
      user: true,
    },
  });

  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <ContentBlock className="w-[720px]">
      <div className="container mx-auto py-8 px-4">
        <CommunityHeader
          name={community.name}
          creatorEmail={community.user.email}
          postCount={community.posts.length}
        />
        <div className="grid gap-6">
          {community.posts.map((post) => (
            <CommunityCard key={post.id} post={{ ...post, community }} />
          ))}
        </div>
        {community.posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts in this community yet.
            </p>
          </div>
        )}
      </div>
    </ContentBlock>
  );
}
