import React from 'react';
import PostForm from "@/components/home/post-form";

function EditPost({params}: { params: { id: string } }) {
    return (
        <div>
            <PostForm actionType="edit" id={params.id}/>
        </div>
    );
}

export default EditPost;