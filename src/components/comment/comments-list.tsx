import { CommentData } from "@/lib/include";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
  comment: CommentData;
}

export default function CommentList({ comment }: CommentProps) {
  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar>
          <AvatarImage
            src={comment.user.image || ""}
            alt={comment.user.name || "User"}
          />
          <AvatarFallback>
            {comment.user.name ? comment.user.name[0].toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {comment.user.email.split("@")[0] || "Anonymous"}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
