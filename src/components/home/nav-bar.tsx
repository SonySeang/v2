import React from "react";
import Link from "next/link";
import PostButton from "@/app/dashboard/_components/post-button";
import SearchField from "../search/search-field";
import Image from "next/image";
import navLogo from "./../../../public/nexus_logo.png";

export default function NavBar() {
  return (
    <header className="sticky top-0 left-0 right-0 bg-[#1C2321] text-white flex items-center justify-between px-5 py-2 z-50">
      <div className="flex items-center">
        <Image
          src={navLogo}
          width={45}
          height={45}
          alt="Picture of the author"
          className="rounded-full"
        />

        <span className=" ml-5 text-xl font-bold">
          <Link href={"/dashboard"}>Nexus Academy</Link>
        </span>
      </div>
      <div className="flex items-center">
        <SearchField />
      </div>
      <div className="flex items-center">
        <PostButton actionType="create" param="" />
      </div>
    </header>
  );
}