import { z } from "zod";
import { userSchema } from "../zod/responses";

export type User = z.infer<typeof userSchema>;

export type UserCtx = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthReady: boolean;
};
