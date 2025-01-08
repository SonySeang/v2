import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { postIdSchema, postSchema } from "@/lib/validations";
import { checkAuth, getPostById } from "@/lib/server-util";

export async function addPost(postData: unknown) {
  const validation = postSchema.safeParse(postData);
  const session = await checkAuth();

  if (!session?.user) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }
  if (!validation.success) {
    return {
      error: "Invalid data",
      status: 400,
    };
  }

  try {
    // const newPost =
    await prisma.post.create({
      data: {
        title: validation.data.title,
        content: validation.data.content,
        community: {
          connect: {
            id: validation.data.communityId,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    // return newPost;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create post",
      status: 500,
    };
  }
  revalidatePath("/dashboard", "layout");
}

export async function editPost(postId: unknown, newPostData: unknown) {
  const validationPostId = postIdSchema.safeParse(postId);
  const validationPost = postSchema.safeParse(newPostData);

  if (!validationPostId.success || !validationPost.success) {
    return {
      error: "Invalid data",
      status: 400,
    };
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: validationPostId.data,
      },
      data: validationPost.data,
    });

    revalidatePath("/dashboard", "layout");
    return updatedPost;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update post",
      status: 500,
    };
  }
}

export async function deletePost(postId: unknown) {
  const validationPostId = postIdSchema.safeParse(postId);

  const session = await checkAuth();

  if (!session.user) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }
  if (!validationPostId.success) {
    return {
      error: "Invalid post ID",
      status: 400,
    };
  }

  const post = await getPostById(validationPostId.data as string);

  if (!post) {
    return {
      error: "Post not found",
      status: 404,
    };
  }

  if (post.userId !== session.user.id)
    return {
      error: "Unauthorized",
    };

  try {
    await prisma.post.delete({
      where: {
        id: validationPostId.data,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete post",
      status: 500,
    };
  }
  revalidatePath("/dashboard", "layout");
}
