import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  isAdmin: z.boolean(),
});

export const responseWithErrorSchema = z.object({
  error: z.string(),
  code: z.number().or(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;
export type ResponseWithError = z.infer<typeof responseWithErrorSchema>;
