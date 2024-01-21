import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 100 }).unique(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: char("password", { length: 60 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  isAdmin: boolean("isAdmin").notNull().default(false),
  isBlocked: boolean("isBlocked").notNull().default(false),
  isTestUser: boolean("isTestUser").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  collections: many(collections),
}));

export const collections = mysqlTable("collections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: int("categoryId").references(() => categories.id, { onDelete: "set null" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [collections.categoryId],
    references: [categories.id],
  }),
  collectionTags: many(collectionTags),
  items: many(items),
}));

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 50 }).notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  collections: many(collections),
}));

export const tags = mysqlTable("tags", {
  title: varchar("title", { length: 50 }).primaryKey(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  collectionTags: many(collectionTags),
}));

export const collectionTags = mysqlTable(
  "collection_tags",
  {
    collectionId: int("collectionId")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    tag: varchar("tag", { length: 50 })
      .notNull()
      .references(() => tags.title, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.collectionId, t.tag] }),
  })
);

export const collectionTagsRelations = relations(collectionTags, ({ one }) => ({
  tag: one(tags, {
    fields: [collectionTags.tag],
    references: [tags.title],
  }),
  collection: one(collections, {
    fields: [collectionTags.collectionId],
    references: [collections.id],
  }),
}));

export const items = mysqlTable("items", {
  id: int("id").autoincrement().primaryKey(),
  collectionId: int("collectionId")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 2000 }),
  createdAt: timestamp("createdAt").defaultNow(),
});
export const itemsRelations = relations(items, ({ one }) => ({
  collection: one(collections, {
    fields: [items.collectionId],
    references: [collections.id],
  }),
}));

// export const attributes = mysqlTable("attributes", {
//   id: int("id").autoincrement().primaryKey(),
//   collectionId: int("collectionId")
//     .references(() => collections.id)
//     .notNull(),
//   title: varchar("title", { length: 100 }),
//   type: mysqlEnum("type", ["smallText", "bigText", "number", "checkbox", "date"]),
// });

// export const itemAttributes = mysqlTable(
//   "item_attributes",
//   {
//     attributeId: int("attributeId")
//       .notNull()
//       .references(() => attributes.id),
//     itemId: int("itemId")
//       .notNull()
//       .references(() => items.id),
//     value: json("value").$type<{ value: string | number | boolean }>().notNull(),
//   },
//   (table) => ({
//     pk: primaryKey({ columns: [table.itemId, table.attributeId] }),
//   })
// );

// export const likes = mysqlTable(
//   "likes",
//   {
//     userId: int("userId")
//       .references(() => users.id)
//       .notNull(),
//     itemId: int("itemId")
//       .references(() => items.id)
//       .notNull(),
//   },
//   (likes) => ({
//     pk: primaryKey({ columns: [likes.itemId, likes.userId] }),
//   })
// );

// export const comments = mysqlTable("comments", {
//   id: int("id").autoincrement().primaryKey(),
//   userId: int("userId").references(() => users.id),
//   itemId: int("itemId")
//     .references(() => items.id)
//     .notNull(),
//   text: varchar("text", { length: 2000 }),
//   createdAt: timestamp("createdAt").defaultNow(),
// });
