"use server";

import prisma from "@/lib/db";

export async function getCommunity() {
  try {
    const community = await prisma.community.findMany();
    return community;
  } catch (error) {
    console.log(error);
  }
}
