import { z } from "zod";

export const likeQuerySchema = z.object({
  itemId: z
    .string()
    .min(1)
    .transform((v) => parseInt(v)),
});

export type LikeQuery = z.infer<typeof likeQuerySchema>;
