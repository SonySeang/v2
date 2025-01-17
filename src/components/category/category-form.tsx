"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import CategoryFormButton from "./category-form-btn";
import { useRouter } from "next/navigation";
import { categorySchema, TCategoryForm } from "@/lib/validations";

interface CategoryFormProps {
  actionType: "create" | "update";
  category?: Category;
}
export default function CategoryForm({
  actionType,
  category,
}: CategoryFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const onSubmit = async (data: TCategoryForm) => {
    try {
      if (actionType === "create") {
        await axios.post("/api/category", data);
        router.push("/dashboard/category");
      } else if (actionType === "update") {
        await axios.patch(`/api/category/${category?.id}`, data);
      }
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {actionType === "create" ? "Create" : "Edit"} Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter Category Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <CategoryFormButton actionType={actionType} />
        </form>
      </CardContent>
    </Card>
  );
}
