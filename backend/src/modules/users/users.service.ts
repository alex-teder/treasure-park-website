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
          items: { extras: {} }, // what is this?
        },
      },
    },
  });
  if (!foundUser) {
    throw new ErrorWithCode("Not found.", 404);
  }
  return { user: foundUser };
}
