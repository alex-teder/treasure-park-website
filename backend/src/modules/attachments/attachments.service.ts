import { eq } from "drizzle-orm";
import { db } from "../../db";
import { attachments } from "../../db/schema";

export async function createAttachments({ itemId, urls }: { itemId: number; urls: string[] }) {
  await db.delete(attachments).where(eq(attachments.itemId, itemId));
  if (!urls.length) return;
  await db.insert(attachments).values(urls.map((url) => ({ url, itemId })));
}
