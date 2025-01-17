"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { CategoryData } from "@/lib/include";

interface CategoryButtonProps {
  actionType: "create" | "update" | "delete";
  category?: CategoryData;
}

export default function CategoryButton({
  actionType,
  category,
}: CategoryButtonProps) {
  const router = useRouter();

  if (actionType === "create") {
    return (
      <Button
        type="submit"
        className="mt-5 self-end"
        onClick={() => router.push("/dashboard/category/create-category")}
      >
        Create Category{" "}
      </Button>
    );
  }
  if (actionType === "update") {
    return (
      <Button
        type="submit"
        className="mt-5 self-end"
        variant="secondary"
        onClick={() => router.push(`/dashboard/category/edit/${category?.id}`)}
      >
        Update
      </Button>
    );
  }
  return null;
}
