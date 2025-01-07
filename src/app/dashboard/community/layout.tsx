import React from "react";
import { Separator } from "@/components/ui/separator";
import ContentBlock from "@/components/content-block";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <ContentBlock className="text-3xl font-bold fixed w-full">
        Communitys
        <Separator />
      </ContentBlock> */}
      <ContentBlock>{children}</ContentBlock>
    </div>
  );
}
