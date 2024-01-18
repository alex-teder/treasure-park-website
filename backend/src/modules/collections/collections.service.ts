import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { collections } from "../../db/schema";

export async function getCollection({ id }: { id: number }) {
  const foundCollection = await db.query.collections.findFirst({
    where: eq(collections.id, id),
    with: {
      items: {
        columns: {
          title: true,
        },
      },
    },
  });
  if (!foundCollection) {
    return { error: "Not found", code: 404 };
  }
  return { collection: foundCollection };
}

export async function createCollection(input: {
  userId: number;
  title: string;
  description?: string;
}) {
  const { insertId } = await db.insert(collections).values(input);
  return { ...input, id: parseInt(insertId) };
}

export async function updateCollection({
  id,
  actorId,
  input,
}: {
  input: { title: string; description?: string };
  id: number;
  actorId: number | "*";
}) {
  const { rowsAffected } = await db
    .update(collections)
    .set(input)
    .where(
      and(eq(collections.id, id), actorId === "*" ? undefined : eq(collections.userId, actorId))
    );
  if (!rowsAffected) throw new Error("Nothing was updated");
}

export async function deleteCollection({ id, actorId }: { id: number; actorId: number | "*" }) {
  const { rowsAffected } = await db
    .delete(collections)
    .where(
      and(eq(collections.id, id), actorId === "*" ? undefined : eq(collections.userId, actorId))
    );
  if (!rowsAffected) throw new Error("Nothing was deleted");
}
