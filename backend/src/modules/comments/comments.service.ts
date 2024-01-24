import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { comments } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";

export async function createComment(input: { authorId: number; itemId: number; text: string }) {
  const { insertId } = await db.insert(comments).values(input);
  return parseInt(insertId);
}

export async function deleteComment({ id, actorId }: { id: number; actorId?: number }) {
  const isAdminAction = !actorId;
  const { rowsAffected } = await db
    .delete(comments)
    .where(and(eq(comments.id, id), isAdminAction ? undefined : eq(comments.authorId, actorId)));
  if (!rowsAffected) throw new ErrorWithCode("Nothing was deleted", 403);
}

export async function getCommentsCount({ itemId }: { itemId: number }) {
  const [result] = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number).as("count") })
    .from(comments)
    .where(eq(comments.itemId, itemId));
  return result;
}
