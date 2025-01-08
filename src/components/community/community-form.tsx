"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommunityFormButton from "./community-form-btn";
import { communitySchema, TCommunityForm } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Community } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommunityFormProps {
  actionType: "create" | "edit";
  community?: Community;
}

export default function CommunityForm({
  actionType,
  community,
}: CommunityFormProps) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommunityForm>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: community?.name || "",
      categoryId: community?.categoryId || "",
    },
  });

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => axios.get("/api/category").then((res) => res.data),
  });

  const onSubmit = async (data: TCommunityForm) => {
    try {
      if (actionType === "create") {
        await axios.post("/api/community", data);
        router.push("/dashboard/community");
      } else if (actionType === "edit") {
        await axios.patch("/api/community/" + community?.id, data);
        router.push("/dashboard/community/list/" + community?.id);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to add some error handling here, e.g., showing an error message to the user
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {actionType === "create" ? "Create" : "Edit"} Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter Community Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId.message}
              </p>
            )}
          </div>
          <CommunityFormButton actionType={actionType} />
        </form>
      </CardContent>
    </Card>
  );
}
