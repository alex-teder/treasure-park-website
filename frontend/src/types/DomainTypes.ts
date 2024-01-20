import { z } from "zod";
import { collectionSchema, userProfileSchema } from "../zod/responses";

export type UserProfile = z.infer<typeof userProfileSchema>;
export type Collection = z.infer<typeof collectionSchema>;
