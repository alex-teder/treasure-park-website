import { z } from "zod";

export const createCollectionBodySchema = z.object({
  userId: z.number().optional(),
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

export type CreateCollectionBody = z.infer<typeof createCollectionBodySchema>;
export type CollectionsBody = z.infer<typeof collectionsBodySchema>;
export type CollectionsParams = z.infer<typeof collectionsParamsSchema>;
