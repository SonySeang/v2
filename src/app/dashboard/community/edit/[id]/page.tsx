import CommunityForm from "@/components/community/community-form";
import prisma from "@/lib/db";
import React from "react";

interface CommunityEditProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityEdit({ params }: Awaited<CommunityEditProps>) {
  const { id } = await params;

  const community = await prisma.community.findUnique({
    where: {
      id,
    },
  });

  if (!community) {
    return <div>Community not found</div>;
  }

  return <CommunityForm actionType="edit" community={community} />;
}
