import { DatabaseError } from "@planetscale/database";
import { db } from "../../db";
import { users } from "../../db/schema";
import { hashPassword, verifyPassword } from "../../utils/hash";
import type { LogInSchema, SignUpSchema } from "./auth.schema";
import { parseDatabaseError } from "../../utils/parseDatabaseError";
import { or, eq } from "drizzle-orm";

export async function signUp(input: SignUpSchema) {
  const { password, ...rest } = input;
  const hashedPassword = await hashPassword(password);
  try {
    await db.insert(users).values({ ...rest, password: hashedPassword });
  } catch (err) {
    if (err instanceof DatabaseError) {
      return { error: parseDatabaseError(err) };
    } else {
      throw err;
    }
  }

  return { user: { ...rest } };
}

export async function logIn(input: LogInSchema) {
  const { password, loginValue } = input;
  const foundUser = await db.query.users.findFirst({
    where: or(eq(users.email, loginValue), eq(users.username, loginValue)),
  });
  if (!foundUser) {
    return { error: "User not found." };
  }
  const isPassValid = await verifyPassword(password, foundUser.password);
  if (!isPassValid) {
    return { error: "Wrong password." };
  }

  return { user: foundUser };
}
