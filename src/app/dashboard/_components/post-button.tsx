"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deletePost } from "@/action/action";

interface PostButtonProps {
  actionType: "edit" | "delete" | "create";
  param: string;
}

function PostButton({ actionType, param }: PostButtonProps) {
  const router = useRouter();
  if (actionType === "create") {
    return (
      <Button
        variant="secondary"
        onClick={() => router.push("/dashboard/create-post")}
      >
        Create Post
      </Button>
    );
  }
  if (actionType === "edit") {
    return (
      <Button
        variant="default"
        onClick={() => router.push(`/dashboard/edit-post/${param}`)}
      >
        Edit
      </Button>
    );
  }
  if (actionType === "delete") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={async () => await deletePost(param)}
              />
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}

export default PostButton;
