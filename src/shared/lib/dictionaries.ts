import "server-only";
import type { Locale } from "@/i18n";

const dictionaries = {
  en: () => import("@/..//messages/en.json").then((module) => module.default),
  ru: () => import("@/..//messages/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  console.log(locale);
  console.log(dictionaries);
  if (!locale) {
    throw new Error("undefined locale");
  }
  return dictionaries[locale]();
};
