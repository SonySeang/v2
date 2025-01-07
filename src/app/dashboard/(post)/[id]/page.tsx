import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import PostButton from "@/app/dashboard/_components/post-button";
import PostDelete from "@/components/post-delete";
import prisma from "@/lib/db";


async function DetailPost({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{post.content}</CardDescription>
      </CardContent>
      <CardFooter>
        <PostButton actionType="edit" param={params.id} />
        <PostDelete postId={post.id} />
      </CardFooter>
    </Card>
  );
}

export default DetailPost;
