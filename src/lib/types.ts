import { Post } from "@prisma/client";
import { PostData } from "./include";

export type PostEssentials = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export interface PostCardProps {
  post: PostData;
}
