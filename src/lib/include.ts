import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
} satisfies Prisma.UserSelect;

export const postDataSelect = {
  id: true,
  title: true,
  content: true,
} satisfies Prisma.PostSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
  like: {
    select: {
      userId: true,
    },
  },
  _count: {
    select: {
      like: true,
    },
  },
  community: true,
} satisfies Prisma.PostInclude;

export const communityDataInclude = {
  posts: {
    include: postDataInclude,
  },
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.CommunityInclude;

export const communityDataSelect = {
  id: true,
  name: true,
  posts: {
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      like: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          like: true,
        },
      },
      user: {
        select: userDataSelect,
      },
    },
  },
} satisfies Prisma.CommunitySelect;

export type CommunityData = Prisma.CommunityGetPayload<{
  include: typeof communityDataInclude;
}>;

export function getCategoryDataSelect() {
  return {
    id: true,
    name: true,
  } satisfies Prisma.CategorySelect;
}

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export interface LikeInfo {
  likes: number;
  isLikeByUser: boolean;
}

export function getCommunityDataSelect() {
  return {
    id: true,
    name: true,
  } satisfies Prisma.CommunitySelect;
}

export function getCommunityDataInclude(loggedInUserId: string) {
  return {
    posts: {
      include: getPostDataInclude(loggedInUserId),
    },
    user: {
      select: getUserDataSelete(loggedInUserId),
    },
    category: {
      select: getCategoryDataSelect(),
    },
  } satisfies Prisma.CommunityInclude;
}

export type CommunityDatas = Prisma.PostGetPayload<{
  include: ReturnType<typeof getCommunityDataInclude>;
}>;

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelete(loggedInUserId),
    },
    community: true,
    like: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        like: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export type PostDatas = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export function getUserDataSelete(loggedInUserId: string) {
  return {
    id: true,
    name: true,
    email: true,
    image: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelete>;
}>;
