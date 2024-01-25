import { z } from "zod";

import { customAttributeTypeSchema, customAttributeValueSchema } from "./reused";

export const signupFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email.")
    .min(5, "Please enter a valid email.")
    .max(100, "Email too long."),
  username: z
    .string()
    .min(3, "Username should be at least 3 characters long.")
    .max(30, "Username too long.")
    .regex(/^[a-zA-Z0-9-]+$/, "Username contains invalid characters."),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long.")
    .max(150, "Password too long."),
});

export const loginFormSchema = z.object({
  loginValue: z.string().min(1).max(100),
  password: z.string().min(1).max(150),
});

const baseCollectionSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  description: z.string(),
  categoryId: z.number().optional(),
  tags: z.array(z.string()),
});

export const newCollectionSchema = baseCollectionSchema.merge(
  z.object({
    attributes: z.array(
      z.object({
        type: customAttributeTypeSchema,
        title: z.string().min(1),
      })
    ),
  })
);

export const editCollectionSchema = baseCollectionSchema.merge(
  z.object({
    attributes: z.array(
      z.object({
        id: z.number(),
        title: z.string().min(1),
      })
    ),
  })
);

export const itemFormSchema = z.object({
  collectionId: z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
  attributes: z.array(
    z.object({
      id: z.number(),
      value: customAttributeValueSchema,
    })
  ),
  attachments: z.array(z.string()),
});

export const commentSchema = z.object({
  text: z.string().min(1).max(2000),
  itemId: z.number(),
});
