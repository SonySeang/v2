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

  if (!session) {
    return <h1>Unauthorized</h1>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const canSeeDot =
    post.userId === session.user.id &&
    session.user.id === "cm60866ca0001rx2ms5lax3lh";
  return (
    <div className="flex flex-row">
      <ContentBlock className="w-full items-start">
        <PostDetail post={post} />
      </ContentBlock>
      <br />
      <ContentBlock className="w-1/4">
        {canSeeDot && <Dot data={{ id: post.id }} />}
      </ContentBlock>
    </div>
  );
}

export default DetailPost;
