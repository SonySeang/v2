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

export interface DotProp {
  data: { id: string };
}

export default async function Dot({ data }: DotProp) {
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
  });
  const session = await checkAuth();

  if (!session.user || session.user.id !== post?.userId) {
    return null
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 w-full border border-gray-200 rounded-md p-4">
        <div>
          <EditButton data={data.id}/>
        </div>
        <div>
          <DeletePostBtn id={data.id} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
