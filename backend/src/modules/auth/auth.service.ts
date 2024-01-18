import { or, eq } from "drizzle-orm";
import { DatabaseError } from "@planetscale/database";
import { db } from "../../db";
import { users } from "../../db/schema";
import { hashPassword, verifyPassword } from "../../utils/hash";
import type { LogInSchema, SignUpSchema } from "./auth.schema";
import { parseDatabaseError } from "../../utils/parseDatabaseError";
import { issueTokenPair } from "../../utils/issueTokenPair";

export async function signUp({ password, email, username }: SignUpSchema) {
  try {
    const isAdmin = false;
    const hashedPassword = await hashPassword(password);
    const { insertId } = await db
      .insert(users)
      .values({ email, username, password: hashedPassword });
    // .returning() !!!
    const id = parseInt(insertId);
    const { accessToken } = issueTokenPair({ id, email, isAdmin });
    return { user: { id, email, isAdmin }, accessToken };
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
  const { id, email, isAdmin } = foundUser;
  const { accessToken } = issueTokenPair({ id, email, isAdmin });
  return { user: foundUser, accessToken };
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
  const { email, isAdmin } = foundUser;
  const { accessToken } = issueTokenPair({ id, email, isAdmin });
  return { user: foundUser, accessToken };
}
