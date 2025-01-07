'use client'
import React, { use } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const form = e.currentTarget;
        const q = (form[0] as HTMLInputElement).value.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    return (
        <form onSubmit={handleSubmit} method="GET" action="/search">
            <Input type="text" name="q" placeholder="Search..." className="pe-10" />
            <button type="submit"></button>
        </form>
    );
}