import prisma from "@/lib/db";
import React from "react";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;

  const getPostById = await prisma.user.findUnique({
    where: {
      id,
    },
    include : {
        posts : true
    }
  });
  return (
    <div>
      <h1>{getPostById?.email?.split("@")[0]}</h1>
    </div>
    
  );
}
