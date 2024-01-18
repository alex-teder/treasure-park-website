import type { User } from "../zod/responses";

export type { User } from "../zod/responses";

export type UserCtx = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthReady: boolean;
};
