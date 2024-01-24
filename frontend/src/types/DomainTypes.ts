import { z } from "zod";

import {
  collectionSchema,
  feedSchema,
  itemSchema,
  popularTagsSchema,
  userProfileSchema,
} from "../zod/responses";
import { customAttributeTypeSchema, customAttributeValueSchema } from "../zod/reused";

export type CustomAttributeType = z.infer<typeof customAttributeTypeSchema>;
export type CustomAttributeValue = z.infer<typeof customAttributeValueSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type PopularTags = z.infer<typeof popularTagsSchema>;
export type Item = z.infer<typeof itemSchema>;
export type FeedPost = z.infer<typeof feedSchema>[number];
