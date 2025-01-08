import CommunityForm from "@/components/community/community-form";
import prisma from "@/lib/db";

interface ComDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ComDetail({ params }: ComDetailProps) {
  const { id } = await params; // Await the params to get the id

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
