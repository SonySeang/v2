import React from 'react';
import {Button} from "@/components/ui/button";

interface DeletePostProps {
    params: { id: string }
}

async function DeletePost(
    {param}: { param: { id: string } }
) {

    return (
        <Button variant="destructive">
            Delete
        </Button>
    );
}

export default DeletePost;