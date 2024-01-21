import { z } from "zod";

export const collectionsBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(10000).optional(),
  categoryId: z.number().optional(),
  tags: z.array(z.string()),
});

export const createCollectionBodySchema = collectionsBodySchema.merge(
  z.object({
    userId: z.number().optional(),
  })
);

export const collectionsParamsSchema = z.object({
  collectionId: z.string().transform((id) => parseInt(id)),
});

export type CollectionsBody = z.infer<typeof collectionsBodySchema>;
export type CreateCollectionBody = z.infer<typeof createCollectionBodySchema>;
export type CollectionsParams = z.infer<typeof collectionsParamsSchema>;
