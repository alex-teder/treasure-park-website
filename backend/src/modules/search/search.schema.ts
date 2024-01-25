import { z } from "zod";

const sortingOptions = z.enum(["newest", "oldest"]);

const searchQuerySchema = z
  .object({
    q: z.string().optional(),
    category: z
      .string()
      .transform((v) => parseInt(v))
      .optional(),
    sort: sortingOptions.optional(),
  })
  .transform(({ category, ...rest }) => ({ ...rest, categoryId: category }));

export type SortingOptions = z.infer<typeof sortingOptions>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
