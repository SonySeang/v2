import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Ellipsis } from "lucide-react";
import React from "react";
import DeletePostBtn from "@/app/dashboard/(post)/[id]/delete-post-btn";
import { checkAuth } from "@/lib/server-util";
import prisma from "@/lib/db";
import EditButton from "@/app/dashboard/(post)/[id]/edit-button";
import CommunityButton from "@/app/dashboard/community/list/[id]/community-btn";

export interface DotProp {
  data: { id: string };
}

export default async function DotCommunity({ data }: DotProp) {
  const communitys = await prisma.community.findUnique({
    where: {
      id: data.id,
    },
  });
  const session = await checkAuth();
  if (!session) {
    return null;
  }
  if (communitys?.userId !== session.user.id) {
    return null;
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 w-full border border-gray-200 rounded-md p-4">
        <div>
          <CommunityButton type="edit" id={communitys.id} />
        </div>
        <div>
          <CommunityButton type="delete" id={communitys.id} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
