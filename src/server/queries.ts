import "server-only";

import { db } from "./db";
import type { TelegramUserData } from "@telegram-auth/server";
import {
  type InsertOperation,
  operations,
  users,
  settings,
  categories,
} from "./db/schema";
import { desc, eq } from "drizzle-orm";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { increaseAccountValue } from "./accounts";
import { getUserSettings } from "./settings";
import { getCurrencyRate } from "./currencies";

type SN = string | number;
const sntoint = (v: SN) => (typeof v === "string" ? +v : v);

export async function createUserOrUpdate(user: TelegramUserData) {
  const alreadyExists = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, user.id),
  });

  if (alreadyExists) {
    return;
  }

  const locale = user.language_code ?? "ru";

  await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        photo_url: user.photo_url,
      },
    })
    .then(async () => {
      await db.insert(settings).values({
        userId: user.id,
        currency: locale === "ru" ? "rub" : "usd",
      });
    })
    .then(async () => {
      await db.insert(categories).values({
        name: locale === "ru" ? "Все" : "All",
        userId: user.id,
        parentId: null,
      });
    });
}

export async function getUserById(id: string) {
  const values = await db.select().from(users).where(eq(users.id, +id));
  if (values.length > 0) {
    return values[0];
  } else {
    return undefined;
  }
}

export async function getCurrentUser() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("No session found when accessing current user");
  }
  return await getUserById(sessionUser.id);
}

export async function getLastUserOperations(userId: SN, limit = 3) {
  return await db
    .select({
      id: operations.id,
      value: operations.value,
      type: operations.type,
      name: operations.name,
    })
    .from(operations)
    .where(eq(operations.userId, sntoint(userId)))
    .orderBy(desc(operations.id))
    .limit(limit);
}

export async function getAllUserOperations(userId: SN) {
  return await db
    .select()
    .from(operations)
    .where(eq(operations.userId, sntoint(userId)));
}

export async function insertOperation(operation: InsertOperation) {
  await db.insert(operations).values(operation).onConflictDoNothing();
  await increaseAccountValue(operation.accountId, operation.value);
}

export async function getDetailedOperation(operationId: number) {
  const result = await db
    .select()
    .from(operations)
    .where(eq(operations.id, operationId));
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserTotalSavings(userId: SN) {
  const id = sntoint(userId);
  const userSettings = await getUserSettings(id);

  if (!userSettings) {
    throw new Error("No User with given id");
  }

  const userAccounts = await db.query.accounts.findMany({
    where: (i, { eq }) => eq(i.userId, id),
  });
  let result = 0;

  for (const account of userAccounts) {
    if (account.currency === userSettings.currency) {
      result += account.value;
    } else {
      const rate = await getCurrencyRate(
        account.currency!,
        userSettings.currency,
      );
      result += account.value * rate;
    }
  }

  return result;
}
