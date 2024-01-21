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
  const { insertId } = await db.insert(categories).values({ title });
  return { id: parseInt(insertId) };
}

export async function deleteCategory({ id }: { id: number }) {
  const { rowsAffected } = await db.delete(categories).where(eq(categories.id, id));
  if (!rowsAffected) throw new ErrorWithCode("Nothing was deleted", 400);
}
