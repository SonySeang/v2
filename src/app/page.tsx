
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row bg-web gap-10 min-h-screen  justify-center items-center ">
      <div>
        {/* <Image src={home_photo} alt="homePhoto" width={519} height={472} /> */}
      </div>
      <div>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Welcome to Nexus academy
        </h1>
        <p className="text-lg my-6 max-w-[500px]">
          Nexus academy is a platform that allows you to learn and grow in your
          career. We offer a wide range of courses that are designed to help you
          achieve your goals.
        </p>
        <Link href="/log-in">Get Start</Link>
      </div>
    </main>
  );
}
