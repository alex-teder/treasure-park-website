import { boolean, char, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 100 }).unique(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: char("password", { length: 60 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  avatar: varchar("avatar", { length: 255 }),
  isAdmin: boolean("isAdmin").notNull().default(false),
  isBlocked: boolean("isBlocked").notNull().default(false),
  isTestUser: boolean("isTestUser").notNull().default(true),
});
