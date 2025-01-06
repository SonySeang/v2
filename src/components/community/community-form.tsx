"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CommunityFormButton from "./community-form-btn";
import { communitySchema, TCommunityForm } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { Community } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<TCommunityForm>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      name: community?.name || "",
      categoryId: community?.categoryId || "",
    },
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/community", data);
          router.push("/dashboard");
        })}
        // onSubmit={handleSubmit(async (data) => {
        //   await createCommunity(data);
        // })}
      >
        <div>
          <Label htmlFor="name">Community Name</Label>
          <Input
            type="text"
            placeholder="Enter Community Name"
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <Label htmlFor="categoryId">CategoryId</Label>
          <Input
            type="text"
            placeholder="Enter Category"
            {...register("categoryId")}
          />
        </div>
        <CommunityFormButton actionType={actionType} />
      </form>
    </div>
  );
}
