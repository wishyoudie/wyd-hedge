import "server-only";
import type { Account } from "./db/schema";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

export async function getCurrencyRate(base: string, target: string) {
  try {
    const response = await fetch(BASE_URL + base + ".json");
    const result = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result[base][target];
  } catch (e) {
    throw new Error(
      JSON.stringify({ message: "Unable to retrieve currency rate" }),
    );
  }
}

export async function getRatedValue(
  base: string,
  target: string,
  value: number,
) {
  const rate = await getCurrencyRate(base, target);
  return value * rate;
}

export async function getTotalAccountsBalance(
  accounts: Account[],
  currency: string,
) {
  let result = 0;
  const rates: Record<string, number> = {};

  for (const account of accounts) {
    const accountCurrency = account.currency!;
    if (accountCurrency === currency) {
      result += account.value;
    } else if (accountCurrency in rates) {
      //@ts-expect-error Object is not undefined
      result += account.value * rates[accountCurrency];
    } else {
      const rate = await getCurrencyRate(accountCurrency, currency);
      rates[accountCurrency] = rate;
      result += account.value * rate;
    }
  }

  return result;
}
