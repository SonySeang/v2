"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CommunityButtonProps {
  type: "edit" | "delete";
  id?: string;
}
export default function CommunityButton({ type, id }: CommunityButtonProps) {
  const router = useRouter();
  if (type === "edit") {
    return (
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => router.push(`/dashboard/community/edit/${id}`)}
      >
        Edit
      </Button>
    );
  }
  return (
    <Button
      variant="destructive"
      onClick={() => router.push(`/dashboard/community/delete${id}`)}
    >
      Delete
    </Button>
  );
}
