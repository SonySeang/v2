"use client";
import { Link } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const router = useRouter();
  return (
    <Button
      type="submit"
      className="mt-5 self-end"
      onClick={() => router.push("/dashboard/category/create-category")}
    >
      Create{" "}
    </Button>
  );
}
