'use client'
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      className="mt-5 self-end"
    >
      Cancel
    </Button>
  );
}
