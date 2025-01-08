"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AddCommunity() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/dashboard/community/create-community")}
    >
      Add
    </Button>
  );
}
