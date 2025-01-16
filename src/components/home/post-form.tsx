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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, TPostForm } from "@/lib/validations";
import { Controller, useForm } from "react-hook-form";
import FormButton from "./form-button";
import { Post } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCommunity } from "@/lib/hook";

interface PostFormProps {
  actionType: "edit" | "create";
  post?: Post;
}

export default function PostForm({ actionType, post }: PostFormProps) {



  const { data: communities } = useCommunity();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      communityId: post?.communityId || "",
    },
  });

  const onSubmit = async (data: TPostForm) => {
    try {
      if (actionType === "create") {
        await axios.post("/api/post", data);
      } else if (actionType === "edit" && post) {
        await axios.patch(`/api/post/${post.id}`, data);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting post:", error);
      // You might want to add some error handling here, e.g., showing an error message to the user
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {actionType === "create" ? "Create New Post" : "Edit Post"}
        </CardTitle>
        <CardDescription>
          Enter the details for your {actionType === "create" ? "new" : ""}{" "}
          post.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
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
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="communityId">Community</Label>
            <Controller
              name="communityId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a community" />
                  </SelectTrigger>
                  <SelectContent>
                    {communities?.map((community) => (
                      <SelectItem key={community.id} value={community.id}>
                        {community.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.communityId && (
              <p className="text-sm text-red-500">
                {errors.communityId.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <FormButton actionType={actionType} isSubmitting={isSubmitting} />
        </CardFooter>
      </form>
    </Card>
  );
}
