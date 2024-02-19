import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { env } from "../config/env";
import { Pool } from "pg";

export const connection = new Pool({
  connectionString: env.DATABASE_URL,
  max: 1,
});

export const db = drizzle(connection, { schema });
