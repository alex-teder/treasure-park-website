import { or, eq } from "drizzle-orm";
import { DatabaseError } from "@planetscale/database";
import { db } from "../../db";
import { users } from "../../db/schema";
import { hashPassword, verifyPassword } from "../../utils/hash";
import type { LogInSchema, SignUpSchema } from "./auth.schema";
import { parseDatabaseError } from "../../utils/parseDatabaseError";

export async function signUp(input: SignUpSchema) {
  try {
    const { password, ...rest } = input;
    const hashedPassword = await hashPassword(password);
    const queryResult = await db.insert(users).values({ ...rest, password: hashedPassword });
    return { user: { ...rest, id: parseInt(queryResult.insertId) } };
  } catch (err) {
    if (err instanceof DatabaseError) {
      return { error: parseDatabaseError(err) };
    } else {
      throw err;
    }
  }
}

export async function logIn(input: LogInSchema) {
  const { password, loginValue } = input;
  const foundUser = await db.query.users.findFirst({
    where: or(eq(users.email, loginValue), eq(users.username, loginValue)),
  });
  if (!foundUser) {
    return { error: "Wrong login or password." };
  }
  if (foundUser.isBlocked) {
    return { error: "User is blocked by admin." };
  }
  const isPassValid = await verifyPassword(password, foundUser.password);
  if (!isPassValid) {
    return { error: "Wrong login or password." };
  }
  return { user: foundUser };
}

export async function relogIn({ id }: { id: number }) {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  if (!foundUser) {
    return { error: "Not found" };
  }
  if (foundUser.isBlocked) {
    return { error: "User is blocked by admin." };
  }
  return { user: foundUser };
}
