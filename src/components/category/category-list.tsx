"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryData } from "@/lib/include";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import DeleleCategory from "@/app/dashboard/category/edit/[id]/delete-category-btn";

export default function CategoryList() {
  const router = useRouter();
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<CategoryData[]>({
    queryKey: ["categories"],
    queryFn: () => axios.get("/api/category").then((res) => res.data),
  });
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Table>
      <TableCaption>A list of categories and their statistics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Communities</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell>{category.communities.length}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  className="mt-5 self-end"
                  variant="secondary"
                  onClick={() =>
                    router.push(`/dashboard/category/edit/${category.id}`)
                  }
                >
                  Update
                </Button>
                <DeleleCategory id={category.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Categories</TableCell>
          <TableCell>{categories?.length || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
function LoadingSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Communities</TableHead>
          <TableHead>Posts</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[50px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[50px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-[120px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
