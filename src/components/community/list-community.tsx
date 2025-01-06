"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommunityData } from "@/lib/include";

export default function ListCommunity() {
  const {
    data: community,
    error,
    isLoading,
  } = useQuery<CommunityData[]>({
    queryKey: ["community-list", "for-you"],
    queryFn: async () =>
      await axios.get("/api/community").then((res) => res.data),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading communities</div>;
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  );
}

