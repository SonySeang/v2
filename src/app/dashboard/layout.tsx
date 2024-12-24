import React from "react";
import ContentBlock from "@/components/content-block";
import SideBar from "@/components/home/side-bar";
import NavBar from "@/components/home/nav-bar";
import AuthProvider from "@/app/dashboard/provider";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <div>
        <NavBar />
        <div className="grid grid-cols-9 min-h-screen m-2 ">
          <ContentBlock className=" p-2 mt-1 h-full w-[300px] border-r-2 fixed ">
            <SideBar />
          </ContentBlock>
          <div className="col-start-3 col-span-7 border-r-2">
            <ContentBlock>{children}</ContentBlock>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
