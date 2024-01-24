import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
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
  comments: many(comments),
  likes: many(likes),
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
  attributes: many(attributes),
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
    id: int("id").autoincrement().primaryKey(),
    collectionId: int("collectionId")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    tag: varchar("tag", { length: 50 })
      .notNull()
      .references(() => tags.title, { onDelete: "cascade" }),
  },
  (t) => ({
    idx: uniqueIndex("idx").on(t.collectionId, t.tag),
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

export const itemsRelations = relations(items, ({ one, many }) => ({
  collection: one(collections, {
    fields: [items.collectionId],
    references: [collections.id],
  }),
  itemAttributes: many(itemAttributes),
  comments: many(comments),
  likes: many(likes),
}));

export const attributes = mysqlTable("attributes", {
  id: int("id").autoincrement().primaryKey(),
  collectionId: int("collectionId")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 50 }).notNull(),
  type: mysqlEnum("type", ["smallText", "bigText", "number", "checkbox", "date"]).notNull(),
});

export const attributesRelations = relations(attributes, ({ one, many }) => ({
  colleciton: one(collections, {
    fields: [attributes.collectionId],
    references: [collections.id],
  }),
  items: many(items),
}));

export const itemAttributes = mysqlTable(
  "item_attributes",
  {
    id: int("id").autoincrement().primaryKey(),
    attributeId: int("attributeId")
      .notNull()
      .references(() => attributes.id, { onDelete: "cascade" }),
    itemId: int("itemId")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    value: json("value").$type<{ value: string | number | boolean }>(),
  },
  (t) => ({
    idx: uniqueIndex("idx").on(t.attributeId, t.itemId),
  })
);

export const itemAttributesRelations = relations(itemAttributes, ({ one }) => ({
  attribute: one(attributes, {
    fields: [itemAttributes.attributeId],
    references: [attributes.id],
  }),
  item: one(items, {
    fields: [itemAttributes.itemId],
    references: [items.id],
  }),
}));

export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  itemId: int("itemId")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  text: varchar("text", { length: 2500 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  item: one(items, {
    fields: [comments.itemId],
    references: [items.id],
  }),
}));

export const likes = mysqlTable(
  "likes",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: int("itemId")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
  },
  (t) => ({
    idx: uniqueIndex("idx").on(t.userId, t.itemId),
  })
);

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  item: one(items, {
    fields: [likes.itemId],
    references: [items.id],
  }),
}));
