import CommunityForm from "@/components/community/community-form";
import prisma from "@/lib/db";
import React from "react";

interface CommunityEditProps {
  params: { id: string };
}

export default async function ({ params }: CommunityEditProps) {
  const community = await prisma.community.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!community) {
    return <div>Community not found</div>;
  }
  return <CommunityForm actionType="edit" community={community} />;
}
