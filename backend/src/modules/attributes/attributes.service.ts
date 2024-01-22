import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { attributes, itemAttributes } from "../../db/schema";
import { CustomAttributeType, CustomAttributeValue } from "../../types";

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
  const query = sql`UPDATE attributes SET title = CASE `;
  for (const attr of attributesToRename) {
    query.append(sql`WHEN id = ${attr.id} THEN ${attr.title} `);
  }
  query.append(sql.raw(`END WHERE id IN (${attributesToRename.map(({ id }) => id)});`));
  const { rowsAffected } = await db.execute(query);
  return rowsAffected;
}

export async function createItemAttributes({
  itemId,
  attributesToCreate,
}: {
  itemId: number;
  attributesToCreate: { id: number; value: CustomAttributeValue }[];
}) {
  const valuesToInsert = attributesToCreate.map(({ id: attributeId, value }) => ({
    itemId,
    attributeId,
    value: { value },
  }));
  await db.delete(itemAttributes).where(eq(itemAttributes.itemId, itemId));
  await db.insert(itemAttributes).values(valuesToInsert);
}
