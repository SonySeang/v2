import SignOutBtn from "@/components/auth/sign-out-btn";
import ContentBlock from "@/components/content-block";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/log-in");
  }
  return (
    <div className="flex  flex-col justify-item-center">
      <h1>Profile</h1>
      <h1>{session.user.email?.split("@")[0]}</h1>
      <ContentBlock>
        <SignOutBtn />
      </ContentBlock>
    </div>
  );
}
