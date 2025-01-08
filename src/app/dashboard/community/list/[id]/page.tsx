import React from "react";
import Link from "next/link";
import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Ellipsis, MessageCircle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentBlock from "@/components/content-block";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CommunityListIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function page(props: CommunityListIdPageProps) {
  const params = await props.params;
  const community = await prisma.community.findUnique({
    where: {
      id: params.id,
    },
    include: {
      posts: {
        include: {
          user: true,
        },
      },
      User: true,
    },
  });
  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <ContentBlock className="w-[720px]">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 space-y-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {community.name}
              </h1>
              <p>
                Create by <span className="font-semibold">{community.User.name}</span>
              </p>
            </div>

            <Popover>
              <PopoverTrigger>
                <Ellipsis />
              </PopoverTrigger>
              <PopoverContent className=" flex flex-col gap-4 w-full">
                <Link
                  className="bg-red"
                  href={`/dashboard/community/edit/${community.id}`}
                >
                  <Button variant="secondary" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Link href={`/dashboard/community/edit/${community.id}`}>
                  <Button variant="destructive" className="w-full">
                    Delete
                  </Button>
                </Link>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {/* {community.Category.name} */}
            </span>
            <span className="text-sm">{community.posts.length} posts</span>
          </div>
        </div>

        <div className="grid gap-6">
          {community.posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={post.user.image || ""}
                      alt={post.user.name || ""}
                    />
                    <AvatarFallback>
                      {post.user.name?.slice(0, 2).toUpperCase() || "UN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/dashboard/${post.id}`}
                      className="text-lg font-semibold hover:underline line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Link
                        href={`/user/${post.user.id}`}
                        className="hover:underline"
                      >
                        {post.user.name}
                      </Link>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {/* {formatDistanceToNow(post.createdAt, { addSuffix: true })} */}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <div className="flex gap-4 -mx-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Like</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <Link href={`/dashboard/${post.id}`}>Comment</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {community.posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts in this community yet.
            </p>
          </div>
        )}
      </div>
    </ContentBlock>
  );
}
