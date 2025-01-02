import z from "zod";

export const postIdSchema = z.string().cuid()
export const postSchema = z.object({
    title: z.string().min(1, {message: "Please give your  title"}),
    content: z
        .string()
        .min(1, {message: "Content must be at least 1 characters long"}),
    // communityId: z.string().min(1, { message: "Please select a community" }),
});
export type TPostForm = z.infer<typeof postSchema>;

export const communitySchema = z.object({
    name: z.string().min(1, {message: "Please give your community a name"}),
    category: z
        .string()
        .min(1, {message: "Please give your community a category"}).optional(),
});

export const categorySchema = z.object({
    name: z.string().min(1, {message: "Please give your category a name"}),

});
