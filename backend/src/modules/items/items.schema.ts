import { z } from "zod";

export const createItemBodySchema = z.object({
  collectionId: z.number(),
  title: z.string().min(1).max(150),
  description: z.string().max(4000).optional(),
});

export const itemsBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(4000).optional(),
});

export const itemsParamsSchema = z.object({
  itemId: z.string().transform((id) => parseInt(id)),
});

export type CreateItemBody = z.infer<typeof createItemBodySchema>;
export type ItemsBody = z.infer<typeof itemsBodySchema>;
export type ItemsParams = z.infer<typeof itemsParamsSchema>;
