import React from "react";
import Link from "next/link";
import Search from "./search";
import PostButton from "@/app/dashboard/_components/post-button";


export default function NavBar() {
    return (
        <header
            className="sticky top-0 left-0 right-0 bg-[#1C2321] text-white flex items-center justify-between px-5 py-2 z-50">
            <div className="flex items-center">
                <div className="bg-gray-500 w-10 h-10 rounded-full mr-4">Logo</div>
                <span className="text-xl font-bold">
          <Link href={"/dashboard"}>Nexus Academy</Link>
        </span>
            </div>
            <div className="flex items-center">
                <Search/>
            </div>
            <div className="flex items-center">
                <PostButton actionType="create" param=""/>
                {/* <SignInButton/> */}
            </div>
        </header>
    );
}