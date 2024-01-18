import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function findUserById({ id }: { id: number }) {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      username: true,
      avatar: true,
    },
    with: {
      collections: {
        columns: {
          title: true,
        },
        with: {
          items: { extras: {} }, // what is this?
        },
      },
    },
  });
  if (!foundUser) {
    return { error: "Not found", code: 404 };
  }
  return { user: foundUser };
}
