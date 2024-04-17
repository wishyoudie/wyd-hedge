// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTableCreator, varchar, integer } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `wyd-hedge_${name}`);

export const users = createTable("user", {
  id: integer("id").primaryKey(),
  first_name: varchar("first_name", { length: 256 }),
  last_name: varchar("last_name", { length: 256 }),
  username: varchar("username", { length: 256 }),
  photo_url: varchar("photo_url", { length: 256 }),
});
