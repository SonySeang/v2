"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  data: string;
}

export default function EditButton({ data }: EditButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(`/dashboard/edit-post/${data}`)}
      variant="secondary"
      className="w-full"
    >
      Edit
    </Button>
  );
}
