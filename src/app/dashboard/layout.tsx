import React from "react";
import ContentBlock from "@/components/content-block";
import SideBar from "@/components/home/side-bar";
import NavBar from "@/components/home/nav-bar";
import AuthProvider from "@/app/dashboard/provider";
import PostContextProvider from "@/context/post-context-provider";
import prisma from "@/lib/db";

interface LayoutProps {
    children: React.ReactNode;
}

export default async function Layout({children}: LayoutProps) {
    const post = await prisma.post.findMany()
    return (


        <AuthProvider>
            <div>
                <NavBar/>
                <div className="grid grid-cols-9 min-h-screen m-2 ">
                    <ContentBlock className=" p-2 mt-1 h-full w-[300px] border-r-2 fixed ">
                        <SideBar/>
                    </ContentBlock>
                    <div className="col-start-3 col-span-7 border-r-2">
                        <PostContextProvider data={post}>
                            <ContentBlock>
                                {children}
                            </ContentBlock>
                        </PostContextProvider>

                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}
