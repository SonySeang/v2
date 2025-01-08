import prisma from "@/lib/db";
import PostDetail from "./detail-post";
import { postDataInclude } from "@/lib/include";
import Dot from "@/components/dot";
import ContentBlock from "@/components/content-block";

async function DetailPost(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: postDataInclude,
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
