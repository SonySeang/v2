"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { updateProfileSchema, UpdateProfileValues } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateProfile(value: UpdateProfileValues) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const { name } = updateProfileSchema.parse(value);

  prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });
  revalidatePath("/");
}
