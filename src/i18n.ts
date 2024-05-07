import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ru"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export default getRequestConfig(async ({ locale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!i18n.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
