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

export const userProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatar: z.string().nullable(),
  collections: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      items: z.array(z.unknown()),
      category: z
        .object({
          title: z.string(),
        })
        .nullable(),
    })
  ),
});

export const collectionSchema = z.object({
  id: z.number(),
  createdAt: z.string().transform((dateStr) => new Date(dateStr)),
  description: z.string().nullable(),
  userId: z.number(),
  title: z.string(),
  category: z
    .object({
      title: z.string(),
      id: z.number(),
    })
    .nullable(),
  collectionTags: z.array(
    z.object({
      tag: z.string(),
    })
  ),
  user: z.object({
    username: z.string(),
    avatar: z.string().nullable(),
  }),
  items: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ),
});
