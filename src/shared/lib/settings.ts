const Settings = {
  precision: 2,
  locales: ["ru", "en"],
  localeWidgetItems: [
    {
      locale: "ru",
      emoji: "🇷🇺",
      text: "Русский",
    },
    {
      locale: "en",
      emoji: "🇬🇧",
      text: "English",
    },
  ],
  currencies: ["rub", "usd"],
  colors: [
    "#000000",
    "#ffffff",
    "#303030",
    "#a0a0a0",
    "#f12c15",
    "#fae04b",
    "#00a0df",
    "#1ed27c",
  ],
  protectedRoutes: [
    "/app/dashboard",
    "/app/transactions",
    "/app/accounts",
    "/app/categories",
    "/app/analytics",
    "/app/settings",
  ],
};

export default Settings;
