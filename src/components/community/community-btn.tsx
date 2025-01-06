"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface CommunityButtonProps {
  type: "add" | "edit" | "delete";
  params?: { id: string };
}
export default function CommunityButton({
  type,
  params,
}: CommunityButtonProps) {
  const router = useRouter();
  if (type === "add") {
    return (
      <Button
        onClick={() => router.push("/dashboard/community/create-community")}
      >
        Add
      </Button>
    );
  }
  if (type === "edit") {
    <Button onClick={() => router.push(`/dashboard/community/edit${params}`)}>
      edit
    </Button>;
  }
  return null;
}
