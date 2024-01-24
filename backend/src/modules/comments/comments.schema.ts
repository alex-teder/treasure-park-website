import { z } from "zod";

export const commentsBodySchema = z.object({
  itemId: z.number(),
  text: z.string().min(1),
});

export const commentsParamsSchema = z.object({
  commentId: z.string().transform((v) => parseInt(v)),
});

export const commentsCountQuerySchema = z.object({
  itemId: z
    .string()
    .min(1)
    .transform((v) => parseInt(v)),
});

export type CommentsBody = z.infer<typeof commentsBodySchema>;
export type CommentsParams = z.infer<typeof commentsParamsSchema>;
export type CommentsCountQuery = z.infer<typeof commentsCountQuerySchema>;
