import type { Locale } from "@/i18n";
import { useLocale as _useLocale } from "next-intl";

export const useLocale = () => {
  return _useLocale() as Locale;
};
