import { z } from "zod";

export const createCollectionBodySchema = z.object({
  userId: z.number(),
  title: z.string().min(1).max(150),
  description: z.string().max(10000).optional(),
});

export const collectionsBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(10000).optional(),
});

export const collectionsParamsSchema = z.object({
  collectionId: z.string().transform((id) => parseInt(id)),
});
