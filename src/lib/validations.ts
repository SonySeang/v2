import z from "zod";
export const postSchema = z.object({
  title: z.string().min(1, { message: "Please give your  title" }),
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long" }),
});

export const communitySchema = z.object({
  name: z.string().min(1, { message: "Please give your community a name" }),
  category: z
    .string()
    .min(1, { message: "Please give your community a category" }),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Please give your category a name" }),
});

export const createPostShema = z.object({
  title: z.string().min(1, { message: "Please give your  title" }).optional(),
  content: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long" }).optional(),
  assigntoCommunityId: z
    .string()
    .min(1, { message: "Please give your community a name" }),
});
