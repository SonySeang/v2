"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { Post } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

// interface DeletePostProps {
//   param: { id: string };
// }

function DeletePost({ postId }: { postId: String }) {
  const router = useRouter();

  const deletePost = async () => {
    try {
      await axios.delete("/api/post/" + postId);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  //   const handleDelete = async () => {
  //     await prisma.post.delete({
  //       where: {
  //         id: post.id
  //       },
  //     });
  //   };

  return (
    <Button variant="destructive" onClick={deletePost}>
      Delete
    </Button>
  );
}

export default DeletePost;
