import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  varchar,
  integer,
  serial,
  timestamp,
  real,
  primaryKey,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `wyd-hedge_${name}`);

export const users = createTable("user", {
  id: serial("id").notNull().primaryKey(),
  tgUsername: varchar("tgUsername"),
  username: varchar("username"),
  password: varchar("password"),
  currency: varchar("currency", { length: 5 }).notNull().default("rub"),
});

export const accounts = createTable("account", {
  id: serial("id").notNull().primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  currency: varchar("currency", { length: 5 }),
  value: real("value").notNull().default(0),
  name: varchar("name"),
  color: varchar("color", { length: 9 }),
});

export const transactions = createTable("transaction", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  accountId: integer("accountId")
    .references(() => accounts.id)
    .notNull(),
  type: varchar("type", { enum: ["expense", "income"] }).notNull(),
  value: real("value").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ many }) => ({
  categories: many(transactionOnCategories),
}));

export const categories = createTable("category", {
  id: serial("id").primaryKey(),
  parentId: integer("parentId"),
  userId: integer("userId").references(() => users.id),
  name: varchar("name").notNull(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  transactions: many(transactions),
}));

export const transactionOnCategories = createTable(
  "transaction_categories",
  {
    transactionId: integer("transactionId")
      .notNull()
      .references(() => transactions.id),
    categoryId: integer("categoryId")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.transactionId, t.categoryId] }),
  }),
);

export const transactionOnCategoriesRelations = relations(
  transactionOnCategories,
  ({ one }) => ({
    transaction: one(transactions, {
      fields: [transactionOnCategories.transactionId],
      references: [transactions.id],
    }),
    category: one(categories, {
      fields: [transactionOnCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
