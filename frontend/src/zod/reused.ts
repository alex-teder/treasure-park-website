import { z } from "zod";

export const customAttributeTypeSchema = z.enum([
  "smallText",
  "bigText",
  "number",
  "checkbox",
  "date",
]);
export const customAttributeValueSchema = z.union([z.string().min(1), z.number(), z.boolean()]);
