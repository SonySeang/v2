"use client";
import React, { createContext } from "react";
import { Post } from "@prisma/client";
import { addPost, deletePost, editPost } from "@/action/action";
import { PostEssentials } from "@/lib/types";
import { useRouter } from "next/navigation";

type PostContextProviderProps = {
  children: React.ReactNode;
  data: Post[];
};

type TPostContext = {
  posts: Post[];
  handleAddPost: (newPost: PostEssentials) => Promise<void>;
  handleEditPost: (
    postId: string,
    newPostData: PostEssentials
  ) => Promise<void>;
  handleDeletePost: (postId: string) => Promise<void>;
};

export const PostContext = createContext<TPostContext | null>(null);

function PostContextProvider({
  children,
  data: posts,
}: PostContextProviderProps) {
  const router = useRouter();

  //event handlers
  const handleAddPost = async (newPost: PostEssentials) => {
    const error = await addPost(newPost);
    if (error) {
      console.log(error);
    }
    router.push("/dashboard");
  };
  const handleEditPost = async (
    postId: Post["id"],
    newPostData: PostEssentials
  ) => {
    const error = await editPost(postId, newPostData);
    if (error) {
      console.log(error);
    }
    router.push("/dashboard");
  };

  const handleDeletePost = async (postId: Post["id"]) => {
    const error = await deletePost(postId);
    if (error) {
      console.log(error);
    }
    router.push("/dashboard");
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        handleAddPost,
        handleEditPost,
        handleDeletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
