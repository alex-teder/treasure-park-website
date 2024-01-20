import { eq } from "drizzle-orm";
import { db } from "../../db";
import { items } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";
import { getCollection } from "../collections/collections.service";

export async function getItem({ id }: { id: number }) {
  const foundItem = await db.query.items.findFirst({
    where: eq(items.id, id),
    with: {
      collection: {
        columns: {
          id: true,
          userId: true,
          title: true,
        },
        with: {
          user: {
            columns: {
              avatar: true,
              username: true,
              id: true,
            },
          },
        },
      },
    },
  });
  if (!foundItem) {
    throw new ErrorWithCode("Not found", 404);
  }
  return { item: foundItem };
}

export async function createItem({
  input,
  actorId,
}: {
  input: {
    collectionId: number;
    title: string;
    description?: string;
  };
  actorId?: number;
}) {
  const { collection } = await getCollection({ id: input.collectionId });
  if (actorId && collection.userId !== actorId) {
    throw new ErrorWithCode("Not allowed.", 403);
  }

  const { insertId } = await db.insert(items).values(input);
  return { id: parseInt(insertId) };
}

export async function updateItem({
  id,
  input,
  actorId,
}: {
  id: number;
  input: {
    title: string;
    description?: string | null;
  };
  actorId?: number;
}) {
  const { item } = await getItem({ id });
  if (actorId && item.collection.userId !== actorId) {
    throw new ErrorWithCode("Not allowed.", 403);
  }

  const { rowsAffected } = await db
    .update(items)
    .set({ title: input.title, description: input.description || null })
    .where(eq(items.id, id));
  if (!rowsAffected) throw new ErrorWithCode("Nothing was updated", 403);
}

export async function deleteItem({ id, actorId }: { id: number; actorId?: number }) {
  const { item } = await getItem({ id });
  if (actorId && item.collection.userId !== actorId) {
    throw new ErrorWithCode("Not allowed.", 403);
  }

  const { rowsAffected } = await db.delete(items).where(eq(items.id, id));
  if (!rowsAffected) throw new ErrorWithCode("Nothing was deleted", 403);
}
