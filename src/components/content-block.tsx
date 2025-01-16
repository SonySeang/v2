import React from "react";
import { cn } from "@/lib/utils";

interface ContentBlockProps {
  children: React.ReactNode;
  className?: string;
}

function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div className={cn(" border-gray-200   overflow-hidden ", className)}>
      {children}
    </div>
  );
}

export default ContentBlock;
