import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
  community: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.PostInclude;

export const postDataSelect = {
  id: true,
  title: true,
  content: true,
} satisfies Prisma.PostSelect;

export const communityDataInclude = {
  posts: {
    include: {
      user: true,
    },
  },
  category : true
} satisfies Prisma.CommunityInclude;

export const communityDataSelect = {
  id: true,
  name: true,
} satisfies Prisma.CommunitySelect;

export type CommunityData = Prisma.CommunityGetPayload<{
  include: typeof communityDataInclude;
}>;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
