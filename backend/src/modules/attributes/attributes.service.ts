import { sql } from "drizzle-orm";
import { db } from "../../db";
import { attributes } from "../../db/schema";
import { CustomAttributeType } from "../../types";

export async function createAttributes({
  collectionId,
  attributesToCreate,
}: {
  collectionId: number;
  attributesToCreate: { title: string; type: CustomAttributeType }[];
}) {
  await db.insert(attributes).values(attributesToCreate.map((attr) => ({ ...attr, collectionId })));
}

export async function renameAttributes(attributesToRename: { id: number; title: string }[]) {
  if (!attributesToRename.length) return;

  let query = `UPDATE attributes SET title = CASE `;
  for (const attr of attributesToRename) {
    query += `WHEN id = ${attr.id} THEN "${attr.title}" `;
  }
  query += `END WHERE id IN (${attributesToRename.map(({ id }) => id)});`;
  const { rowsAffected } = await db.execute(sql.raw(query));
  return rowsAffected;
}
