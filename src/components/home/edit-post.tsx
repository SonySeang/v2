"use client";
import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import "easymde/dist/easymde.min.css";
import {zodResolver} from "@hookform/resolvers/zod";
import {postSchema, TPostForm} from "@/lib/validations";
import {useForm} from "react-hook-form";
import FormButton from "./form-button";
import {Post} from "@prisma/client";
import {usePostContext} from "@/lib/hook";
import {Textarea} from "@/components/ui/textarea";

interface PostFormProps {
    actionType: "edit" | "create";
    post?: Post;
}

export default function EditPostForm({actionType, post}: PostFormProps) {
    const {handleEditPost} = usePostContext();
    const {
        register,
        trigger,
        formState: {errors},
        getValues,
    } = useForm<TPostForm>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
        }
    });
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {actionType === "create" ? "Create New Item" : "Edit Item"}
                </CardTitle>
                <CardDescription>
                    Enter the title and description for your{" "}
                    {actionType === "create" ? "new" : ""} item.
                </CardDescription>
            </CardHeader>
            <form
                action={async () => {
                    const result = await trigger();
                    if (!result) return;
                    const postData = getValues();

                    if (actionType === "edit" && post?.id) {
                        await handleEditPost(post.id, postData);
                    }
                }}
            >
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Description</Label>
                        <Textarea
                            placeholder="Your Description"
                            id="content"
                            {...register("content")}
                        />
                        {errors.content && (
                            <p className="text-red-500">{errors.content.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <FormButton actionType={actionType}/>
                </CardFooter>
            </form>
        </Card>
    );
}
