import CommunityButton from "@/components/community/community-btn";
import ListCommunity from "@/components/community/list-community";
import React from "react";

export default function Community() {
  return (
    <div>
      <CommunityButton type="add" />
      <div>
        <ListCommunity />
      </div>
    </div>
  );
}
