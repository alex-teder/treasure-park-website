import { z } from "zod";
import { userProfileSchema } from "../zod/responses";

export type UserProfile = z.infer<typeof userProfileSchema>;
