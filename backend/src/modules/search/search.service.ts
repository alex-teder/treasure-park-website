import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { collectionTags, collections, items, likes, users } from "../../db/schema";
import { SortingOptions } from "./search.schema";

function getSortingOrder(param: "newest" | "oldest" | undefined) {
  switch (param) {
    case "newest":
      return desc(items.createdAt);
    case "oldest":
      return asc(items.createdAt);
    default:
      return desc(sql`likes_count`);
  }
}

function getMatchClause(param: string | undefined) {
  if (!param) return sql`1`;
  return sql`MATCH (items.title, items.description)
  AGAINST (${param + "*"} IN BOOLEAN MODE)
  OR
  MATCH (collections.title, collections.description)
  AGAINST (${param + "*"} IN BOOLEAN MODE)
  OR
  users.username LIKE ${"%" + param + "%"}
  OR
  collection_tags.tag LIKE ${"%" + param + "%"}`;
}

function getCategoryClause(param: number | undefined) {
  if (param === undefined) return undefined;
  return eq(collections.categoryId, param);
}

export async function getSearchResults(input: {
  q?: string;
  categoryId?: number;
  sort?: SortingOptions;
}) {
  const results = await db
    .select({
      itemId: items.id,
      title: items.title,
      createdAt: items.createdAt,
      collectionId: items.collectionId,
      collectionTitle: collections.title,
      userId: collections.userId,
      username: users.username,
      likesCount: sql<number>`COUNT(${likes.id})`.mapWith(Number).as("likes_count"),
    })
    .from(items)
    .leftJoin(collections, eq(items.collectionId, collections.id))
    .leftJoin(users, eq(collections.userId, users.id))
    .leftJoin(likes, eq(items.id, likes.itemId))
    .leftJoin(collectionTags, eq(collections.id, collectionTags.collectionId))
    .where(and(getMatchClause(input.q), getCategoryClause(input.categoryId)))
    .groupBy(items.id)
    .orderBy(getSortingOrder(input.sort));
  return results;
}
