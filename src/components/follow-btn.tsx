"use client";
import { useFollowerInfo } from "@/lib/hook";
import { followerIdInfo } from "@/lib/include";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axios from "axios";

interface FollowBtnProps {
  userId: string;
  initialState: followerIdInfo;
}

export default function FollowButton({ userId, initialState }: FollowBtnProps) {
  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userId, initialState);
  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? axios.delete(`/api/users/${userId}/followers`)
        : axios.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<followerIdInfo>(queryKey);
      queryClient.setQueryData<followerIdInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(error);
    },
  });
  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
