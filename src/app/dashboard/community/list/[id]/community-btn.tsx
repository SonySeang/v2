"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CommunityButtonProps {
  type: "edit" | "delete";
  params: { id: string };
}
export default function CommunityButton({
  type,
  params,
}: CommunityButtonProps) {
  const router = useRouter();
  if (type === "edit") {
    return (
      <Button
        variant="secondary"
        onClick={() => router.push(`/dashboard/community/edit/${params.id}`)}
      >
        Edit
      </Button>
    );
  }
  return (
    <Button
      variant="destructive"
      onClick={() => router.push(`/dashboard/community/delete${params}`)}
    >
      Delete
    </Button>
  );
}
