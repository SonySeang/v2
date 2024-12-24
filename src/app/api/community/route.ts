import { NextRequest, NextResponse } from "next/server";
import { communitySchema, postSchema } from "@/lib/validations";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = communitySchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }


    prisma.community.create({
        data: {
            name: body.name,
        },
    })
}

export async function GET(request: NextRequest) {
  const community = await prisma.community.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return NextResponse.json(community);
}
