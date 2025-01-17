import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <h1 className="text-3xl font-serif mb-6">Welcome </h1>
      {children}
    </div>
  );
}
