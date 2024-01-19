import { z } from "zod";

export const signUpBodySchema = z.object({
  email: z.string().email().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  isTestUser: z.boolean().optional(),
});

export const logInBodySchema = z.object({
  loginValue: z.string().min(1),
  password: z.string().min(1),
});

export const authResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  isAdmin: z.boolean(),
});

export type SignUpBody = z.infer<typeof signUpBodySchema>;
export type LogInBody = z.infer<typeof logInBodySchema>;
