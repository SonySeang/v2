import { Post } from "@prisma/client";

export type PostEssentials = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
    community: {
      name: string;
    };
    // _count: {
    //   likes: number;
    //   comments: number;
    // };
  };
}
