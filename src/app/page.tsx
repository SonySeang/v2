import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row bg-gray-200 min-h-screen justify-center items-center p-8 gap-10">
      <div className="md:w-1/2 order-2 md:order-1">
        <Image
          src="https://images.unsplash.com/photo-1610385983496-d9bb0fe6a852?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Nexus Academy"
          width={519}
          height={472}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 order-1 md:order-2">
        <h1 className="text-4xl md:text-5xl font-semibold my-6 max-w-[500px] text-black">
          Welcome to Nexus Academy
        </h1>
        <p className="text-lg my-6 max-w-[500px] text-gray-700">
          Nexus Academy is a platform that allows you to learn and grow in your
          career. We offer a wide range of courses that are designed to help you
          achieve your goals.
        </p>
        <Button
          asChild
          className="text-xl font-semibold bg-black text-white hover:bg-gray-800"
        >
          <Link href="/log-in">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
