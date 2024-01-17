import { relations } from "drizzle-orm";
import { boolean, char, int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

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
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  items: many(items),
}));

export const items = mysqlTable("items", {
  id: int("id").autoincrement().primaryKey(),
  collectionId: int("collectionId")
    .notNull()
    .references(() => collections.id),
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

// export const categories = mysqlTable("categories", {
//   id: int("id").autoincrement().primaryKey(),
//   title: varchar("title", { length: 50 }).notNull().unique(),
// });

// export const tags = mysqlTable("tags", {
//   id: int("id").autoincrement().primaryKey(),
//   title: varchar("title", { length: 50 }).notNull().unique(),
// });

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
