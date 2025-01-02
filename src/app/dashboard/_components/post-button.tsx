'use client'
import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
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
import {usePostContext} from "@/lib/hook";
import {deletePost} from "@/action/post";

interface PostButtonProps {
    actionType: "edit" | "delete" | "create";
    params?: {id : string};
}

function PostButton({actionType, params}: PostButtonProps) {
    const router = useRouter();

    // const handleDelete = async () => {
    //     await axios.delete(`/api/post/${params}`);
    //     router.push("/dashboard");
    //     router.refresh();
    // };
    if (actionType === "create") {
        return (
            <Button
                variant="secondary"
                onClick={() => router.push("/dashboard/create-post")}
            >
                Create
            </Button>
        );
    }
    if (actionType === "edit") {
        return (
            <Button
                variant="default"
                onClick={() => router.push(`/dashboard/edit-post/${params}`)}
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
                    <DialogDescription>

                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="destructive"
                                onClick={ async () => await deletePost(params?.id)}
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