import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-start  w-full">{children}</div>;
}
