import { z } from "zod";

export const itemsBodySchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(4000).optional(),
  attributes: z.array(
    z.object({
      id: z.number(),
      value: z.union([z.number(), z.string(), z.boolean()]),
    })
  ),
});

export const createItemBodySchema = itemsBodySchema.merge(
  z.object({
    collectionId: z.number(),
  })
);

export const itemsParamsSchema = z.object({
  itemId: z.string().transform((id) => parseInt(id)),
});

export type CreateItemBody = z.infer<typeof createItemBodySchema>;
export type ItemsBody = z.infer<typeof itemsBodySchema>;
export type ItemsParams = z.infer<typeof itemsParamsSchema>;
