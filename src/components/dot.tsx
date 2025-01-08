"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import DeletePostBtn from "@/app/dashboard/(post)/[id]/delete-post-btn";

interface DotProp {
  data: { id: string };
}

export default function Dot({ data }: DotProp) {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Ellipsis />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 w-full border border-gray-200 rounded-md p-4">
        <div>
          <Button
            onClick={() => router.push(`/dashboard/edit-post/${data.id}`)}
            variant="secondary"
            className="w-full"
          >
            Edit
          </Button>
        </div>
        <div>
          <DeletePostBtn id={data.id} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
