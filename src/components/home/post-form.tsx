"use client";

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

import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";

import axois from "axios";
import { useRouter } from "next/navigation";
import { postSchema } from "@/lib/validations";
import SimpleMDE from "react-simplemde-editor";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import FormButton from "./form-button";
import { Post } from "@prisma/client";
import ErrorMessage from "../error-message";

interface PostFormProps {
  actionType: "edit" | "create";
  params?: { id: string };
  post?: Post;
}

export default function PostForm({ actionType, params, post }: PostFormProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Item</CardTitle>
        <CardDescription>
          Enter the title and description for your new item.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            if (actionType === "edit") {
              await axois.patch(`/api/post/${params?.id}`, data);
              router.push("/dashboard");
              console.log(data);
            }
            if (actionType === "create") {
              await axois.post("/api/post", data);
              router.push("/dashboard");
              console.log(data);
            }
          } catch (error) {
            console.error(error);
          }
        })}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              {...register("title")}
              defaultValue={post?.title}
            />
            {/* <ErrorMessage>{errors.}</ErrorMessage> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Description</Label>
            <Controller
              name="content"
              control={control}
              defaultValue={post?.content}
              render={({ field }) => (
                <SimpleMDE
                  id="content"
                  placeholder="Enter description"
                  {...field}
                />
              )}
            />
            {/* <ErrorMessage>{errors.content?.message}</ErrorMessage> */}
          </div>
        </CardContent>
        <CardFooter>
          <FormButton actionType={actionType} />
        </CardFooter>
      </form>
    </Card>
  );
}
