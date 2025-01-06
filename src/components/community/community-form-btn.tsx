import React from "react";
import { Button } from "../ui/button";

interface CommunityFormButtonProps {
  actionType: "create" | "edit";
}

export default function CommunityFormButton({
  actionType,
}: CommunityFormButtonProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "create" ? "Create Community" : "Edit Community"}
    </Button>
  );
}
