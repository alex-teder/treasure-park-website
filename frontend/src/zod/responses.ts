import { z } from "zod";

import { customAttributeTypeSchema, customAttributeValueSchema } from "./reused";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  isAdmin: z.boolean(),
});

export const responseWithErrorSchema = z.object({
  error: z.string(),
  statusCode: z.number().optional(),
  message: z.string().optional(),
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
  attributes: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      type: customAttributeTypeSchema,
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

export const popularTagsSchema = z.array(
  z.object({
    value: z.string(),
    count: z.number(),
  })
);

export const categoriesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
  })
);

export const itemSchema = z.object({
  id: z.number(),
  collectionId: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  attachments: z.unknown().optional(),
  createdAt: z.string().transform((str) => new Date(str)), // format (date-fns??)
  itemAttributes: z.array(
    z.object({
      value: z
        .object({
          value: customAttributeValueSchema,
        })
        .transform(({ value }) => value),
      attribute: z.object({
        id: z.number(),
        title: z.string(),
        type: customAttributeTypeSchema,
      }),
    })
  ),
  collection: z.object({
    title: z.string(),
    user: z.object({
      avatar: z.string().nullable(),
      username: z.string(),
      id: z.number(),
    }),
  }),
  comments: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
      createdAt: z.string(),
      itemId: z.number(),
      author: z.object({
        avatar: z.string().nullable(),
        username: z.string(),
        id: z.number(),
      }),
    })
  ),
});

export const createItemResponseSchema = z.object({
  id: z.number(),
});

export const commentsCountResponseSchema = z.object({
  count: z.number(),
});
