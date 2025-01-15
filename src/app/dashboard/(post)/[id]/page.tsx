import prisma from "@/lib/db";
import PostDetail from "./detail-post";
import { getPostDataInclude } from "@/lib/include";
import Dot from "@/components/dot";
import ContentBlock from "@/components/content-block";
import { checkAuth } from "@/lib/server-util";

async function DetailPost(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await checkAuth();
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: getPostDataInclude(session.user.id),
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-row">
      <ContentBlock className="w-full items-start">
        <PostDetail post={post} />
      </ContentBlock>
      <ContentBlock className="w-1/4">
        <Dot data={post} />
      </ContentBlock>
    </div>
  );
}

export default DetailPost;
