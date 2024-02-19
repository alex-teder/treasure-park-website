import { DatabaseError } from "@planetscale/database";
import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { likes } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";

export async function likeItem(input: { userId: number; itemId: number }) {
  try {
    await db.insert(likes).values(input);
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.message.includes("AlreadyExists")) {
        throw new ErrorWithCode("Duplicate entry.", 409);
      }
    }
    throw err;
  }
}

export async function unlikeItem({ userId, itemId }: { userId: number; itemId: number }) {
  const rows = await db
    .delete(likes)
    .where(and(eq(likes.itemId, itemId), eq(likes.userId, userId))).returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was updated.", 400);
}
