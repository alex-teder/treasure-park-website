export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export type UserCtx = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthReady: boolean;
};
