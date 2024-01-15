import { z } from "zod";

export const authErrorSchema = z.object({ error: z.string() });

export const authResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
});

export const signUpSchema = z.object({
  email: z.string().email().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  isTestUser: z.boolean().optional(),
});

export const logInSchema = z.object({
  loginValue: z.string().min(1),
  password: z.string().min(1),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type LogInSchema = z.infer<typeof logInSchema>;
