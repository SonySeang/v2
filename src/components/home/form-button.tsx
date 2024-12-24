import { Button } from "../ui/button";

type PetFormBtnProps = {
  actionType: "create" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "create" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}
