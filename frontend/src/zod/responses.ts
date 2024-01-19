import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  isAdmin: z.boolean(),
});

export const responseWithErrorSchema = z.object({
  error: z.string(),
  statusCode: z.number().optional(),
  message: z.string(),
  code: z.string().optional(),
});
