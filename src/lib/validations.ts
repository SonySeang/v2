import z from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const postIdSchema = z.string().cuid();
export const postSchema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  communityId: z.string().nonempty("Community ID is required"),
});
export type TPostForm = z.infer<typeof postSchema>;

export const communitySchema = z.object({
  name: z.string().min(1, { message: "Please give your community a name" }),
  categoryId: z
    .string()
    .min(1, { message: "Please give your community a category" })
    .optional(),
});
export type TCommunityForm = z.infer<typeof communitySchema>;

export const communityId = z.string().cuid();

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Please give your category a name" }),
});

export type TCategoryForm = z.infer<typeof categorySchema>;

export const authFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(2, "Password must be at least 6 characters"),
});

export type TauthForm = z.infer<typeof authFormSchema>;

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Cannot be empty"),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;


export const UserSchema = z.object({
  email: z.string().email(),
  hashedpassword: z.string(),
  name: z.string(),
})

export const createCommentSchema = z.object({
  content : requiredString,
}) 