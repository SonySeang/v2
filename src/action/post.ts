"use server";

import {auth} from "@/lib/auth";
import prisma from "@/lib/db";
import {postIdSchema, postSchema} from "@/lib/validations";
import {revalidatePath} from "next/cache";
export async function addPost(post: unknown) {
    const validation = postSchema.safeParse(post);
    if (!validation.success) {
        return {
            error: "Invalid data",
            status: 400,
        };
    }
    const session = await auth();

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

    const {...postData} = validation.data;

    try {
        await prisma.post.create({
            data: {
                ...postData,
                User: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
    } catch (error) {
        console.log(error);
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
        prisma.post.update({
            where: {
               id : validationPostId.data
            },
            data: validationPost.data
        });
    } catch (error) {
        return {
            error: "Failed to update post",
        }
    }

    revalidatePath("/dashboard", "layout");
}

export async function deletePost(postId: unknown) {
    const validationPostId = postIdSchema.safeParse(postId);

    if (!validationPostId.success ) {
        return {
            error: "Invalid data",
            status: 400,
        };
    }
    try {
        prisma.post.delete({
            where: {
                id : validationPostId.data,
            }
        });
    } catch (error) {
        return {
            error: "Failed to delete post",
        }
    }

    revalidatePath("/dashboard", "layout");
}