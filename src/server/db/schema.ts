// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  varchar,
  integer,
  serial,
  pgEnum,
  timestamp,
  real,
  primaryKey,
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
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type InsertOperation = Omit<
  typeof operations.$inferInsert,
  "user_id" | "id"
>;
export type Operation = typeof operations.$inferSelect;

export const operationsRelations = relations(operations, ({ many }) => ({
  operationCategories: many(operationOnCategories),
}));

export const categories = createTable("category", {
  id: serial("id").primaryKey(),
  parentId: integer("parentId"),
  userId: integer("userId").references(() => users.id),
  name: varchar("name").notNull(),
  color: varchar("color", { length: 9 }),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  operations: many(operations),
}));

export type InsertCategory = Omit<typeof categories.$inferInsert, "id">;
export type Category = typeof categories.$inferSelect;

export const operationOnCategories = createTable(
  "post_categories",
  {
    operationId: integer("operationId")
      .notNull()
      .references(() => operations.id),
    categoryId: integer("categoryId")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.operationId, t.categoryId] }),
  }),
);

export const operationOnCategoriesRelations = relations(
  operationOnCategories,
  ({ one }) => ({
    operation: one(operations, {
      fields: [operationOnCategories.operationId],
      references: [operations.id],
    }),
    category: one(categories, {
      fields: [operationOnCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
