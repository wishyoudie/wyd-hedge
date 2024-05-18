import ThemeProvider from "./_providers/theme-provider";

import "@/styles/globals.css";

import { Inter } from "next/font/google";

import AuthProvider from "./_providers/auth-provider";
import { type Locale } from "@/i18n";
import Settings from "@/shared/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Accountant",
  description: "Budget Planner App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export async function generateStaticParams() {
  return Settings.locales.map((locale) => ({ locale }));
}

export default function LocalizedRootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${inter.variable} h-screen overflow-hidden bg-background`}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="h-full overflow-y-scroll">{children}</div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
