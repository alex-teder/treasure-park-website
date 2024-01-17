import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  IS_DEV: z.string().optional(),
  FRONTEND_DEV_PORT: z
    .string()
    .transform((port) => parseInt(port))
    .optional(),
  DATABASE_URL: z.string(),
  PW_SALT: z.string(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
