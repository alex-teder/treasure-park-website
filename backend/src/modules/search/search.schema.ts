import { z } from "zod";

const sortingOptions = z.enum(["newest", "oldest"]);

const searchQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: sortingOptions.optional(),
});

export type SortingOptions = z.infer<typeof sortingOptions>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
