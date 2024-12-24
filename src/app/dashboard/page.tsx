import React from 'react';
import ContentBlock from "@/components/content-block";
import RecentlyPost from "@/components/home/recently-post";
import PostCard from "@/components/post-card";

function Page() {
    return (
        <div className="grid grid-cols-3">
            <div className="col-start-1 col-span-2">
                <ContentBlock className="m-2">
                    <PostCard  />
                </ContentBlock>
            </div>
            <div className="col-start-3 col-span-1 ">
                <ContentBlock className=" bg-blue-400 border-2 ml-2 mt-2">
                    <RecentlyPost />
                </ContentBlock>
            </div>
        </div>
    );
}

export default Page;