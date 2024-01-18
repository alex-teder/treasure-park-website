import { z } from "zod";

export const usersParamsSchema = z.object({ userId: z.string().transform((id) => parseInt(id)) });
