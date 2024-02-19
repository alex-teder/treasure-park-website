import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { comments } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";

export async function createComment(input: { authorId: number; itemId: number; text: string }) {
  const [{ id }] = await db.insert(comments).values(input).returning({id: comments.id});
  return id;
}

export async function deleteComment({ id, actorId }: { id: number; actorId?: number }) {
  const isAdminAction = !actorId;
  const rows = await db
    .delete(comments)
    .where(and(eq(comments.id, id), isAdminAction ? undefined : eq(comments.authorId, actorId))).returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was deleted", 403);
}

export async function getCommentsCount({ itemId }: { itemId: number }) {
  const [result] = await db
    .select({ count: sql<number>`COUNT(*)`.mapWith(Number).as("count") })
    .from(comments)
    .where(eq(comments.itemId, itemId));
  return result;
}
