import prisma from "@/lib/db";
import PostDetail from "./detail-post";
import { getPostDataInclude } from "@/lib/include";
import Dot from "@/components/dot";
import ContentBlock from "@/components/content-block";
import { checkAuth } from "@/lib/server-util";
import { Heading1 } from "lucide-react";
import { auth } from "@/lib/auth";

async function DetailPost(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await checkAuth();
  const sessions = await auth()
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: getPostDataInclude(session.user.id),
  });

  if (!session) {
    return <h1>Unauthorized</h1>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-row">
      <ContentBlock className="w-full items-start">
        <PostDetail post={post} />
      </ContentBlock>

      <ContentBlock className="w-1/4">
        {sessions?.user.hasAcess !== true && <Dot data={{ id: post.id }} />}
      </ContentBlock>
    </div>
  );
}

export default DetailPost;
