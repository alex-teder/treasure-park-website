import { ReactNode, createContext, useEffect, useState } from "react";
import { ResponseWithError, User, UserCtx } from "../types";
import { api } from "../api";

export const UserContext = createContext<UserCtx>({
  user: null,
  setUser: () => {},
  isAuthReady: false,
});

export function UserProvider({ children }: { children?: ReactNode | ReactNode[] }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    async function initAuth() {
      if (localStorage.getItem("isLoggedIn")) {
        const data = await api.relogIn();
        if ((data as ResponseWithError).error) {
          localStorage.removeItem("isLoggedIn");
        } else {
          setUser(data as User);
        }
      }
      setIsAuthReady(true);
    }

    initAuth();
  }, [setUser]);

  useEffect(() => {
    if (isAuthReady) {
      if (user !== null) {
        localStorage.setItem("isLoggedIn", "1");
      } else {
        localStorage.removeItem("isLoggedIn");
      }
    }
  }, [user, isAuthReady]);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthReady }}>{children}</UserContext.Provider>
  );
}
