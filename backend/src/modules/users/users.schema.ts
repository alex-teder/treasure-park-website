import { z } from "zod";

export const usersParamsSchema = z.object({ userId: z.string().transform((id) => parseInt(id)) });

export const permissionsBodySchema = z.object({
  isAdmin: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
});

export type UsersParams = z.infer<typeof usersParamsSchema>;
export type PermissionsBody = z.infer<typeof permissionsBodySchema>;
