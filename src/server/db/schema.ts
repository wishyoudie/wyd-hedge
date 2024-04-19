// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTableCreator,
  varchar,
  integer,
  serial,
  pgEnum,
  timestamp,
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

export const operations = createTable("operation", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  op_type: operationEnum("op_type").notNull(),
  value: integer("value").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type TInsertOperation = Omit<
  typeof operations.$inferInsert,
  "user_id" | "id"
>;
