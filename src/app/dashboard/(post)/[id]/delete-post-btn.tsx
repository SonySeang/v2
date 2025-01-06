"use client";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/action/action";

function DeletePostBtn({ params }: { params: { id: string } }) {
  return (
    <Button onClick={async () => await deletePost(params.id)}>Delete</Button>
  );
}

export default DeletePostBtn;
