"use client";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/action/action";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";

function DeletePostBtn({ id }: { id: string }) {
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
              onClick={async () => await deletePost(id)}
            />
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePostBtn;
