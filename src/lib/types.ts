import {Post} from "@prisma/client";

export type PostEssentials = Omit<
    Post,
    "id" | "createdAt" | "updatedAt" | "userId"
>;
