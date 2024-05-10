import {
  type accounts,
  type categories,
  type transactions,
  type users,
} from "./schema";

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type AccountWithTransactions = Account & { transactions: Transaction[] };
export type Transaction = typeof transactions.$inferSelect;
export type Category = typeof categories.$inferSelect;
