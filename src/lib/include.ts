import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    name: true,
    email: true,
    image: true,
    followers: {
      where: {
        followingId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getUserDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.PostInclude;
}

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
  comments: {
    select: {
      id: true,
      content: true,
      createAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  },
  _count: {
    select: {
      like: true,
      comments: true,
    },
  },
  community: true,
} satisfies Prisma.PostInclude;

export const categoryDataSelect = {
  id: true,
  name: true,
} satisfies Prisma.CategorySelect;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export const communityDataInclude = {
  posts: {
    include: postDataInclude,
  },
  user: {
    select: userDataSelect,
  },
  category: {
    select: categoryDataSelect,
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
      comments: {
        select: {
          id: true,
          content: true,
          createAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          like: true,
          comments: true,
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

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelete(loggedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;
export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}
export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
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
    comments: {
      include: getCommentDataInclude(loggedInUserId),
    },
    _count: {
      select: {
        like: true,
        comments: true,
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
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followingId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelete>;
}>;

export interface followerIdInfo {
  followers: number;
  isFollowedByUser: boolean;
}
