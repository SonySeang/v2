import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormButtonProps {
  actionType: "edit" | "create";
  isSubmitting: boolean;
}

export default function FormButton({
  actionType,
  isSubmitting,
}: FormButtonProps) {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {actionType === "create" ? "Creating..." : "Updating..."}
        </>
      ) : actionType === "create" ? (
        "Create Post"
      ) : (
        "Update Post"
      )}
    </Button>
  );
}
