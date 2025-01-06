import { Prisma } from "@prisma/client";


export const postDataInclude = {
  user: {
    select: {
        name: true,
        image: true,
    }
  },
} satisfies Prisma.PostInclude;

export const postDataSelect = {
  title: true,
  content: true,
  
} satisfies Prisma.PostSelect;

export const communityDataInclude = {
  posts: {
    select: postDataInclude,
  },
} satisfies Prisma.CommunityInclude;


export const communityDataSelect = {
  id: true,
  name: true,
} satisfies Prisma.CommunitySelect;

export type CommunityData = Prisma.CommunityGetPayload<{
  include: typeof communityDataInclude;
}>;
