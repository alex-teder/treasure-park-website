import { z } from "zod";

import { collectionSchema, popularTagsSchema, userProfileSchema } from "../zod/responses";

export type CustomFieldType = "smallText" | "bigText" | "number" | "checkbox" | "date";

export type UserProfile = z.infer<typeof userProfileSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type PopularTags = z.infer<typeof popularTagsSchema>;
