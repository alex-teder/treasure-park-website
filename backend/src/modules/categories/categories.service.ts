import { eq } from "drizzle-orm";
import { db } from "../../db";
import { categories } from "../../db/schema";
import { ErrorWithCode } from "../../utils/errors";

export async function getAllCategories() {
  const result = await db.query.categories.findMany();
  return result;
}

export async function createCategory({ title }: { title: string }) {
  const existing = await db.query.categories.findFirst({
    where: eq(categories.title, title),
  });
  if (existing) throw new ErrorWithCode("Category already exists.", 409);
  const [{ id }] = await db.insert(categories).values({ title }).returning({id: categories.id});
  return { id };
}

export async function deleteCategory({ id }: { id: number }) {
  const rows = await db.delete(categories).where(eq(categories.id, id)).returning();
  if (!rows.length) throw new ErrorWithCode("Nothing was deleted", 400);
}
