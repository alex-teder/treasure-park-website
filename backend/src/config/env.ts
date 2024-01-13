import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  FRONTEND_DEV_PORT: z
    .string()
    .transform((port) => parseInt(port))
    .optional(),
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
