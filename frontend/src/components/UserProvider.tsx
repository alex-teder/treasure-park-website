import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/api";
import { User, UserCtx } from "@/types";

const RELOGIN_INTERVAL_MS = 60 * 1000;

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
        const { user, error } = await api.relogIn();
        if (error) {
          localStorage.removeItem("isLoggedIn");
        } else {
          setUser(user);
        }
      }
      setIsAuthReady(true);
    }

    initAuth();
  }, [setUser]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      const { user, error } = await api.relogIn();
      if (error) {
        localStorage.removeItem("isLoggedIn");
        setUser(null);
      } else {
        setUser(user);
      }
    }, RELOGIN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [user]);

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
