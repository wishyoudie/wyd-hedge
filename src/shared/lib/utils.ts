import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Settings from "./settings";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale = "ru-RU") {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    day: "numeric",
  }).format(date);
}

export function formatMoney(value: number, currency = "RUB", locale = "ru-RU") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: Settings.precision,
  }).format(value);
}

export function isMac() {
  return navigator.platform.indexOf("Mac") > -1;
}

export function capitalize(str: string) {
  if (str.length === 0) return str;

  return str[0]!.toUpperCase() + str.substring(1);
}
