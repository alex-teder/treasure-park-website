import { useContext } from "react";
import { RouterProvider as RRProvider } from "react-router-dom";

import { router } from "../router";
import { UserContext } from "./UserProvider";

export function RouterProvider() {
  const { isAuthReady } = useContext(UserContext);
  if (isAuthReady) {
    return <RRProvider router={router} />;
  }
  return null;
}
