import {useContext} from "react";
import {PostContext} from "@/context/post-context-provider";

export function  usePostContext() {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePostContext must be used within a PostContextProvider");
    }
    return context;
}