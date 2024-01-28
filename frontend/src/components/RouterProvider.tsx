import { useContext } from "react";
import { RouterProvider as RRProvider } from "react-router-dom";

import { UserContext } from "@/components/UserProvider";
import { router } from "@/router";

export function RouterProvider() {
  const { isAuthReady } = useContext(UserContext);
  if (isAuthReady) {
    return <RRProvider router={router} />;
  }
  return null;
}
