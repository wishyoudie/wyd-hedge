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
