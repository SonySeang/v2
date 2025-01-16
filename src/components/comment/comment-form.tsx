import { PostData } from "@/lib/include";
import { useState } from "react";

import { useSubmitCommentMutation } from "./mutations";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";

interface CommentProps {
  post: PostData;
}

export default function CommentsForm({ post }: CommentProps) {
  const [input, setInput] = useState("");
  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => {
          setInput("");
        },
      }
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <Textarea
        placeholder="Comment"
        className="w-full"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        variant="destructive"
        className="mt-2"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <Send className="w-4 h-4 mr-2" />
        ) : (
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
        )}
      </Button>
    </form>
  );
}
