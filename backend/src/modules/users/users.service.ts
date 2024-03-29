import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";

export async function findUserById({ id }: { id: number }) {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      username: true,
      avatar: true,
    },
    with: {
      collections: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          category: true,
          items: {
            columns: {
              id: true,
            },
          },
        },
      },
    },
  });
  if (!foundUser) {
    throw new ErrorWithCode("Not found.", 404);
  }
  return { user: foundUser };
}

export async function changeUserPermissions({
  id,
  input,
}: {
  id: number;
  input: { isBlocked?: boolean; isAdmin?: boolean };
}) {
  if (input.isBlocked === undefined && input.isAdmin === undefined) {
    throw new ErrorWithCode("Nothing to update.", 400);
  }
  await db.update(users).set(input).where(eq(users.id, id));
}

export async function deleteUser({ id }: { id: number }) {
  const rows = await db.delete(users).where(eq(users.id, id)).returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was deleted.", 400);
}
