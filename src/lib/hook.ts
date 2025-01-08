import { useContext } from "react";
import { PostContext } from "@/context/post-context-provider";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "@/app/dashboard/(post)/create-post/action";


export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider");
  }
  return context;
}

const  useCommunity = () =>  {
  const { data } = useQuery({
    queryKey: ["community", "all"],
    queryFn: () => getCommunity(),
  });
  return { data };
}
export default useCommunity;