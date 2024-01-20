import { z } from "zod";
import { responseWithErrorSchema } from "../zod/responses";
import { User } from "./UserTypes";
import { UserProfile } from "./DomainTypes";

type ResponseWithError = z.infer<typeof responseWithErrorSchema>;

export interface MyApi {
  readonly BASE_URL: string;

  fetch(
    url: string | URL,
    options: RequestInit
  ): Promise<{ data?: unknown; error?: ResponseWithError }>;

  logIn(input: { loginValue: string; password: string }): Promise<{
    user?: User;
    error?: ResponseWithError;
  }>;

  signUp(input: { email: string; username: string; password: string }): Promise<{
    user?: User;
    error?: ResponseWithError;
  }>;

  relogIn(): Promise<{
    user?: User;
    error?: ResponseWithError;
  }>;

  getUserProfile(id: number): Promise<{
    userProfile: UserProfile;
  }>;
}
