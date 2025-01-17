"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface DeleleCategoryProps {
  id: string;
}
export default function DeleleCategory({ id }: DeleleCategoryProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/category/${id}`);
      router.refresh();
      router.push("/dashboard/category");
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
  };
  return (
    <Button
      className="mt-2 self-end"
      variant={"destructive"}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}
