import ThemeProvider from "~/app/[locale]/_providers/theme-provider";

import "~/styles/globals.css";

import { Inter } from "next/font/google";

import AuthProvider from "./_providers/auth-provider";
import { Toaster } from "~/components/sonner/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Accountant",
  description: "Finances Managing App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <AuthProvider>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`font-sans antialiased ${inter.variable} flex h-screen flex-col overflow-hidden bg-background`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
