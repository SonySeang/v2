import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { communitySchema } from "@/lib/validations";
import { postDataInclude } from "@/lib/include";

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    // Parse the request body
    const body = await request.json();
    const validation = communitySchema.safeParse(body);

    // Validate the input data
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 } // Bad Request
      );
    }

    // Check if the community exists
    const community = await prisma.community.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!community) {
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 } // Not Found
      );
    }

    // Update the community
    const updatedCommunity = await prisma.community.update({
      where: { id: params.id },
      data: {
        name: body.name,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(updatedCommunity);
  } catch (error) {
    console.error("Error updating community:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    // Check if the community exists
    const community = await prisma.community.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!community) {
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 } // Not Found
      );
    }

    // Delete the community
    await prisma.community.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Community deleted" });
  } catch (error) {
    console.error("Error deleting community:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    // Check if the community exists
    const community = await prisma.community.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!community) {
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 } // Not Found
      );
    }

    const Newposts = await prisma.post.findMany({
      where: {
        communityId: community.id,
      },
      include: postDataInclude,
    });

    return NextResponse.json(community);
  } catch (error) {
    console.error("Error getting community:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
