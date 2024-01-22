import { desc, eq, inArray, notInArray, sql } from "drizzle-orm";
import { db } from "../../db";
import { collectionTags, tags } from "../../db/schema";

export async function getTags() {
  const result = await db
    .select({
      value: tags.title,
      count: sql<number>`COUNT(${collectionTags.tag})`.mapWith(Number).as("count"),
    })
    .from(tags)
    .leftJoin(collectionTags, eq(tags.title, collectionTags.tag))
    .groupBy(tags.title)
    .orderBy(desc(sql`count`));
  return result;
}

export async function createCollectionTags({
  collectionId,
  tagTitles,
}: {
  collectionId: number;
  tagTitles: string[];
}) {
  await createTags(tagTitles);
  await db.delete(collectionTags).where(eq(collectionTags.collectionId, collectionId));
  await db
    .insert(collectionTags)
    .values(tagTitles.map((tag) => ({ tag, collectionId })))
    .onDuplicateKeyUpdate({ set: { tag: sql`tag` } });
}

export async function cleanUpUnusedTags() {
  const usedTags = db.selectDistinct({ title: collectionTags.tag }).from(collectionTags);
  const tagsToDelete: string[] = (
    await db.select().from(tags).where(notInArray(tags.title, usedTags))
  ).map(({ title }) => title);
  const { rowsAffected } = await db.delete(tags).where(inArray(tags.title, tagsToDelete));
  return rowsAffected;
}

async function createTags(tagTitles: string[]) {
  await db
    .insert(tags)
    .values(tagTitles.map((title) => ({ title })))
    .onDuplicateKeyUpdate({ set: { title: sql`title` } });
}
