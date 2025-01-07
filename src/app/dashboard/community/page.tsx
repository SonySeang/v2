import AddCommunity from "@/components/community/add-community";
import CommunityButton from "@/app/dashboard/community/list/[id]/community-btn";
import ListCommunity from "@/components/community/list-community";
import ContentBlock from "@/components/content-block";
import React from "react";

export default function Community() {
  return (
    <div className="grid grid-cols-7 grid-rows-[45px_1fr]">
      <div className="col-start-1 col-end-6">
        <h1 className="text-3xl font-bold">Community</h1>
      </div>
      <div className="col-start-6">
        <AddCommunity />
      </div>
      <div className="row-start-2 col-start-1 col-end-6 ">
        <ContentBlock className="mt-5">
          <ListCommunity />
        </ContentBlock>
      </div>
    </div>
  );
}
