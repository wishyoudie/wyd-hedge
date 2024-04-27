// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  varchar,
  integer,
  serial,
  pgEnum,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const operationEnum = pgEnum("op_type", ["expense", "income"]);

export const createTable = pgTableCreator((name) => `wyd-hedge_${name}`);

export const users = createTable("user", {
  id: integer("id").primaryKey(),
  first_name: varchar("first_name", { length: 256 }),
  last_name: varchar("last_name", { length: 256 }),
  username: varchar("username", { length: 256 }),
  photo_url: varchar("photo_url", { length: 256 }),
});

export const settings = createTable("settings", {
  userId: integer("userId")
    .references(() => users.id)
    .notNull()
    .primaryKey(),
  currency: varchar("currency", { length: 5 }).notNull().default("rub"),
  locale: varchar("locale", { length: 5 }).notNull().default("ru"),
});

export type InsertSettings = typeof settings.$inferInsert;
export type Settings = typeof settings.$inferSelect;

export const accounts = createTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  currency: varchar("currency", { length: 5 }),
  value: real("value").notNull().default(0),
  name: varchar("name"),
  color: varchar("color", { length: 9 }),
});

export type InsertAccount = typeof accounts.$inferInsert;
export type Account = typeof accounts.$inferSelect;

export const operations = createTable("operation", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  accountId: integer("accountId")
    .references(() => accounts.id)
    .notNull(),
  type: operationEnum("type").notNull(),
  value: real("value").notNull(),
  currency: varchar("currency", { length: 5 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertOperation = Omit<
  typeof operations.$inferInsert,
  "user_id" | "id"
>;
export type Operation = typeof operations.$inferSelect;
