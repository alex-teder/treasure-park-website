import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { collections } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";

export async function getCollection({ id }: { id: number }) {
  const foundCollection = await db.query.collections.findFirst({
    where: eq(collections.id, id),
    with: {
      user: {
        columns: {
          username: true,
          avatar: true,
        },
      },
      items: {
        columns: {
          id: true,
          title: true,
        },
      },
    },
  });
  if (!foundCollection) {
    throw new ErrorWithCode("Not found", 404);
  }
  return { collection: foundCollection };
}

export async function createCollection(input: {
  userId: number;
  title: string;
  description?: string;
}) {
  const { insertId } = await db.insert(collections).values(input);
  return { id: parseInt(insertId) };
}

export async function updateCollection({
  id,
  actorId,
  input,
}: {
  input: { title: string; description?: string };
  id: number;
  actorId?: number;
}) {
  const { rowsAffected } = await db
    .update(collections)
    .set(input)
    .where(and(eq(collections.id, id), actorId ? eq(collections.userId, actorId) : undefined));
  if (!rowsAffected) throw new ErrorWithCode("Nothing was updated", 403);
}

export async function deleteCollection({ id, actorId }: { id: number; actorId?: number }) {
  const { rowsAffected } = await db
    .delete(collections)
    .where(and(eq(collections.id, id), actorId ? eq(collections.userId, actorId) : undefined));
  if (!rowsAffected) throw new ErrorWithCode("Nothing was deleted", 403);
}
