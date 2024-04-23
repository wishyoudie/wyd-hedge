import "server-only";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

export async function getCurrencyRate(base: string, target: string) {
  const response = await fetch(BASE_URL + base + ".json");
  const result = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result[base][target];
}
