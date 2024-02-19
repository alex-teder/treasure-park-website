import { or, eq } from "drizzle-orm";
import { DatabaseError } from "@planetscale/database";
import { db } from "../../db";
import { users } from "../../db/schema";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { parseAuthError } from "../../utils/parseAuthError";
import { issueToken } from "../../utils/issueToken";
import { ErrorWithCode } from "../../utils/errors";

export async function signUp({
  password,
  email,
  username,
}: {
  password: string;
  email: string;
  username: string;
}) {
  try {
    const hashedPassword = await hashPassword(password);
    const [{ id }] = await db
      .insert(users)
      .values({ email, username, password: hashedPassword })
      .returning({id: users.id});
    const isAdmin = false;
    const { accessToken } = issueToken({ id, email, isAdmin });
    return { user: { id, email, isAdmin }, accessToken };
  } catch (err) {
    if (err instanceof DatabaseError) {
      throw new ErrorWithCode(parseAuthError(err), 409);
    } else {
      throw err;
    }
  }
}

export async function logIn({ loginValue, password }: { loginValue: string; password: string }) {
  const foundUser = await db.query.users.findFirst({
    where: or(eq(users.email, loginValue), eq(users.username, loginValue)),
  });
  if (!foundUser) {
    throw new ErrorWithCode("Wrong login or password.", 401);
  }
  const isPassValid = await verifyPassword(password, foundUser.password);
  if (!isPassValid) {
    throw new ErrorWithCode("Wrong login or password.", 401);
  }
  if (foundUser.isBlocked) {
    throw new ErrorWithCode("User is blocked by admin.", 403);
  }
  const { id, email, isAdmin } = foundUser;
  const { accessToken } = issueToken({ id, email, isAdmin });
  return { user: foundUser, accessToken };
}

export async function relogIn({ id }: { id: number }) {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  if (!foundUser) {
    throw new ErrorWithCode("Not found.", 404);
  }
  if (foundUser.isBlocked) {
    throw new ErrorWithCode("User is blocked by admin.", 403);
  }
  const { email, isAdmin } = foundUser;
  const { accessToken } = issueToken({ id, email, isAdmin });
  return { user: foundUser, accessToken };
}
