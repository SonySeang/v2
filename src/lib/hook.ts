import { useContext } from "react";
import { PostContext } from "@/context/post-context-provider";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "@/app/dashboard/(post)/create-post/action";
import { followerIdInfo } from "./include";
import axios from "axios";

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider");
  }
  return context;
}

export const useCommunity = () => {
  const { data } = useQuery({
    queryKey: ["community", "all"],
    queryFn: () => getCommunity(),
  });
  return { data };
};

export function useFollowerInfo(userId: string, initialState: followerIdInfo) {
  const query = useQuery({
    queryKey: ["follower-info", userId],
    queryFn: () =>
      axios.get(`/api/users/${userId}/followers`).then(response => response.data as followerIdInfo),
    initialData: initialState,
    staleTime: Infinity,
  });
  return query
}
