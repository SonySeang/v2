import prisma from "@/lib/db";
import { communityDataInclude } from "@/lib/include";
import React from "react";
import Com from "./community-card";

export default async function test() {
  const test = await prisma.community.findMany({
    include: communityDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      {test.map((com) => (
        <Com key={com.id} test={com} />
      ))}
    </div>
  );
}
