import { Button } from "../ui/button";

interface CategoryFormButtonProps {
  actionType: "create" | "update";
}
export default function CategoryFormButton({
  actionType,
}: CategoryFormButtonProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "create" ? "Create Category" : "Edit Category"}
    </Button>
  );
}
