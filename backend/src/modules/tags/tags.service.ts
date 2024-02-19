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
    .limit(25)
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
  if (!tagTitles.length) return;
  await db
    .insert(collectionTags)
    .values(tagTitles.map((tag) => ({ tag, collectionId })))
    .onConflictDoNothing();
}

export async function cleanUpUnusedTags() {
  const usedTags = db.selectDistinct({ title: collectionTags.tag }).from(collectionTags);
  const tagsToDelete: string[] = (
    await db.select().from(tags).where(notInArray(tags.title, usedTags))
  ).map(({ title }) => title);
  if (!tagsToDelete.length) return;
  const rows = await db.delete(tags).where(inArray(tags.title, tagsToDelete)).returning();
  return rows.length;
}

async function createTags(tagTitles: string[]) {
  if (!tagTitles.length) return;
  await db
    .insert(tags)
    .values(tagTitles.map((title) => ({ title })))
    .onConflictDoNothing();
}
