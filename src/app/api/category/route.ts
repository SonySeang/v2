import prisma from "@/lib/db";
import { categorySchema, communitySchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = categorySchema.safeParse(body)

  const { name , communityId } = body

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  prisma.category.create({
    data: {
      name,
      communityId
    }
  })
  
}
