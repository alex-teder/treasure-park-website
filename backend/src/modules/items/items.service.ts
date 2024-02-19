import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { comments, items } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";
import { getCollection } from "../collections/collections.service";
import { CustomAttributeValue } from "../../types";
import { createItemAttributes } from "../attributes/attributes.service";
import { createAttachments } from "../attachments/attachments.service";

export async function getItem({ id }: { id: number }) {
  const foundItem = await db.query.items.findFirst({
    where: eq(items.id, id),
    with: {
      comments: {
        columns: {
          authorId: false,
        },
        with: {
          author: {
            columns: {
              avatar: true,
              username: true,
              id: true,
            },
          },
        },
        orderBy: [asc(comments.createdAt)],
      },
      likes: true,
      itemAttributes: {
        with: {
          attribute: true,
        },
      },
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
      attachments: true,
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
    attributes: { id: number; value: CustomAttributeValue }[];
    attachments: string[];
  };
  actorId?: number;
}) {
  const { collection } = await getCollection({ id: input.collectionId });
  if (actorId && collection.userId !== actorId) {
    throw new ErrorWithCode("Not allowed.", 403);
  }
  const [{ id }] = await db.insert(items).values(input).returning({id: items.id});
  await createItemAttributes({ itemId: id, attributesToCreate: input.attributes });
  await createAttachments({ itemId: id, urls: input.attachments });
  return id;
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
    attributes: { id: number; value: CustomAttributeValue }[];
    attachments: string[];
  };
  actorId?: number;
}) {
  const { item } = await getItem({ id });
  if (actorId && item.collection.userId !== actorId) {
    throw new ErrorWithCode("Not allowed.", 403);
  }
  const rows = await db
    .update(items)
    .set({ title: input.title, description: input.description || null })
    .where(eq(items.id, id)).returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was updated", 403);
  await createItemAttributes({ itemId: id, attributesToCreate: input.attributes });
  await createAttachments({ itemId: id, urls: input.attachments });
  return id;
}

export async function deleteItem({ id, actorId }: { id: number; actorId?: number }) {
  const { item } = await getItem({ id });
  if (actorId && item.collection.userId !== actorId) {
    throw new ErrorWithCode("Not allowed.", 403);
  }
  const rows = await db.delete(items).where(eq(items.id, id)).returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was deleted", 403);
}
