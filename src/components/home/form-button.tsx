
import { Button } from "../ui/button";

type PostFormBtnProps = {
  actionType: "create" | "edit";
};
export default function FormButton({ actionType }: PostFormBtnProps) {
  return (
    <Button
      type="submit"
      className="mt-5 self-end"
    
    >
      {actionType === "create" ? "Add a new Post" : "Edit Post"}
    </Button>
  );
}
