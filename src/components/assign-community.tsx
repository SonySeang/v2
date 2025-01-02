import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Community } from "@prisma/client";

export default function AssignCommunity({
  community,
}: {
  community: Community;
}) {
  const {
    data: communities,
    error,
    isLoading,
  } = useQuery<Community[]>({
    queryKey: ["community"],
    queryFn: () => axios.get("/api/community").then((res) => res.data),
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <Select
      onValueChange={(communityId) => {
        axios.post("api/post", { communityId: community });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Community" />
      </SelectTrigger>
      <SelectContent>
        {communities?.map((com) => (
          <SelectItem key={com.id} value={com.id}>
            {com.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
