import { Metadata } from "next";
import React from "react";
import SearchResults from "./search-result";

interface PageProps {
  searchParams: Promise<{ q: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `Search results for "${q}"`,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <div className="text-lg mb-4">
          Search for: <span className="font-semibold">&quot;{q}&quot;</span>
        </div>
        <SearchResults query={q} />
      </div>
    </main>
  );
}
