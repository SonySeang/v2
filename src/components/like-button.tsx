'use client'
import { LikeInfo } from "@/lib/include";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  id: string;
  initialState: LikeInfo;
}

export default function LikeButton({ id , initialState }: LikeButtonProps) {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["like", id];

  const { data } = useQuery({
    queryKey: ["like", id],
    queryFn: () =>
      axios
        .get(`/api/post/like/${id}`)
        .then((response) => response.data as LikeInfo),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isLikeByUser
        ? axios.delete(`/api/post/like/${id}`)
        : axios.post(`/api/post/like/${id}`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<LikeInfo>(queryKey);
      queryClient.setQueryData<LikeInfo>(queryKey, () => ({
        likes: (previousState?.likes || 0) + (data.isLikeByUser ? -1 : 1),
        isLikeByUser: !previousState?.isLikeByUser,
      }));
      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.log(error);
    },
  });

  return (
    <Button onClick={() => mutate()} variant="ghost">
      <ThumbsUp
        className={cn(
          "size-5",
          data.isLikeByUser && "fill-blue-500 text-blue-500"
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.likes} <span className="hidden sm:inline">Like</span>
      </span>
    </Button>
  );
}
