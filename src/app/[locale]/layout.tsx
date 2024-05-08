import ThemeProvider from "./_providers/theme-provider";

import "@/styles/globals.css";

import { Inter } from "next/font/google";

import AuthProvider from "./_providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { type Locale } from "@/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";
import Aside from "./_components/aside";
import Header from "./_components/header";
import AppCommandDialog from "@/widgets/command/command";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Accountant",
  description: "Budget Planner App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
            <TooltipProvider>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Aside />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                  <Header />
                  {children}
                </div>
              </div>
              <Toaster />
              <AppCommandDialog />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
