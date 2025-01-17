"use client";
import React from "react";
import { GoHome, GoSearch, GoListUnordered, GoPeople } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CategoryButton from "../category/category-btn";

const routes = [
  { label: "Home", path: "/dashboard" },
  { label: "Community", path: "/dashboard/community" },
  { label: "Following", path: "/dashboard/following" },
  { label: "Profile", path: "/dashboard/profile" },
  { label: "Category", path: "/dashboard/category" },
];
const icons = [
  <GoHome key="home" className="h-6 w-6" />,
  <GoSearch key="search" className="h-6 w-6" />,
  <GoListUnordered key="categories" className="h-6 w-6" />,
  <GoPeople key="community" className="h-6 w-6" />,
  <GoPeople key="profile" className="h-6 w-6" />,
];

function SideBar() {
  const activePathname = usePathname();

  return (
    <ul className="flex flex-col space-y-4 p-2 w-full bg-gray-200 rounded-md">
      {routes.map((route, index) => (
        <li key={route.path}>
          <Link
            href={route.path}
            className={cn(
              "h-[40px] w-full flex items-center p-2 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] hover:rounded-md transition",
              { "rounded-md": route.path === activePathname }
            )}
          >
            {icons[index]}
            <p className="text-xl ml-2">{route.label}</p>
          </Link>
        </li>
      ))}
 
    </ul>
  );
}

export default SideBar;
