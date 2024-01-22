import { z } from "zod";

export const baseBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(10000).optional(),
  categoryId: z.number().optional(),
  tags: z.array(z.string()),
});

export const createCollectionBodySchema = baseBodySchema.merge(
  z.object({
    userId: z.number().optional(),
    attributes: z.array(
      z.object({
        title: z.string(),
        type: z.enum(["smallText", "bigText", "number", "checkbox", "date"]),
      })
    ),
  })
);

export const updateCollecitonBodySchema = baseBodySchema.merge(
  z.object({
    attributes: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    ),
  })
);

export const collectionsParamsSchema = z.object({
  collectionId: z.string().transform((id) => parseInt(id)),
});

export type CreateCollectionBody = z.infer<typeof createCollectionBodySchema>;
export type UpdateCollectionBody = z.infer<typeof updateCollecitonBodySchema>;
export type CollectionsParams = z.infer<typeof collectionsParamsSchema>;
