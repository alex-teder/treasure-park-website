import { and, desc, eq, gt, sql } from "drizzle-orm";
import { db } from "../../db";
import { collections, items, users } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";
import { cleanUpUnusedTags, createCollectionTags } from "../tags/tags.service";
import { CustomAttributeType } from "../../types";
import { createAttributes, renameAttributes } from "../attributes/attributes.service";

export async function getCollection({ id }: { id: number }) {
  const foundCollection = await db.query.collections.findFirst({
    where: eq(collections.id, id),
    with: {
      category: true,
      collectionTags: true,
      attributes: true,
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
  categoryId?: number;
  tags: string[];
  attributes: { title: string; type: CustomAttributeType }[];
}) {
  const { tags, attributes, ...rest } = input;
  const [{ id }] = await db.insert(collections).values({ ...rest }).returning({id: collections.id});
  await createCollectionTags({ collectionId: id, tagTitles: tags });
  await createAttributes({ collectionId: id, attributesToCreate: attributes });
  return { id };
}

export async function updateCollection({
  id,
  actorId,
  input,
}: {
  input: {
    title: string;
    description?: string;
    categoryId?: number;
    tags: string[];
    attributes: { id: number; title: string }[];
  };
  id: number;
  actorId?: number;
}) {
  const { tags, attributes, ...rest } = input;
  const rows = await db
    .update(collections)
    .set({ ...rest })
    .where(and(eq(collections.id, id), actorId ? eq(collections.userId, actorId) : undefined))
    .returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was updated", 400);
  await createCollectionTags({ collectionId: id, tagTitles: input.tags });
  await renameAttributes(attributes);
  await cleanUpUnusedTags();
}

export async function deleteCollection({ id, actorId }: { id: number; actorId?: number }) {
  const rows = await db
    .delete(collections)
    .where(and(eq(collections.id, id), actorId ? eq(collections.userId, actorId) : undefined))
    .returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was deleted", 403);
  await cleanUpUnusedTags();
}

export async function getTopCollections(length: number = 5) {
  const result = await db
    .select({
      id: collections.id,
      title: collections.title,
      userId: collections.userId,
      count: sql`COUNT(${items.id})`.mapWith(Number).as("item_count"),
      username: users.username,
    })
    .from(collections)
    .leftJoin(items, eq(collections.id, items.collectionId))
    .leftJoin(users, eq(collections.userId, users.id))
    .groupBy(collections.id)
    .having(gt(sql`item_count`, 0))
    .orderBy(desc(sql`item_count`))
    .limit(length);
  return result;
}
