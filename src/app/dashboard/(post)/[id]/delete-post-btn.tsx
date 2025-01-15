"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeletePostBtnProps {
  id: string;
}

export default function DeletePostBtn({ id }: DeletePostBtnProps) {
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await axios.delete(`/api/post/${id}`);
      router.push("/dashboard/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleSubmit}>
      Delete
    </Button>
  );
}
