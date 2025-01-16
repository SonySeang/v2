import { checkAuth } from "@/lib/server-util";
import React from "react";

export default  function ProfileData() {
  const session = checkAuth();
  return <div>ProfileData</div>;
}
