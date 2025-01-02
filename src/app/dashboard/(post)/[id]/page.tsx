import React from 'react';
import prisma from "@/lib/db";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import PostButton from "@/app/dashboard/_components/post-button";
import DeletePostBtn from "@/components/home/delete-post-btn";

async function DetailPost({params}: { params: { id: string } }) {
    const post = await prisma.post.findUnique({
        where: {
            id: params.id
        }
    })
    return (
        <div className="w-500px">
            <h1>Post detail</h1>
            <Card>
                <CardHeader>
                    {post.userId}
                </CardHeader>
                <CardContent>
                    <div>
                        Title : {post.title}
                    </div>
                    <div>
                        Description : {post.content}
                    </div>
                </CardContent>
                <CardFooter>
                    <PostButton actionType="edit"/>
                    <DeletePostBtn params={params}/>
                </CardFooter>
            </Card>
        </div>
    );
}

export default DetailPost;