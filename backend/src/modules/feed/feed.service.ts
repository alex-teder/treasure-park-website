import { desc } from "drizzle-orm";
import { db } from "../../db";
import { items } from "../../db/schema";

export async function getFeed() {
  return await db.query.items.findMany({
    limit: 10,
    orderBy: [desc(items.createdAt)],
    columns: {
      collectionId: false,
    },
    with: {
      collection: {
        columns: {
          id: true,
          title: true,
        },
        with: {
          user: {
            columns: {
              id: true,
              avatar: true,
              username: true,
            },
          },
        },
      },
      comments: {
        columns: {
          id: true,
        },
        extras: {},
      },
      likes: {
        columns: {
          id: true,
        },
      },
    },
  });
}
