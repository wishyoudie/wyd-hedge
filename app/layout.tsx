import ThemeProvider from "~/app/theme/theme-provider";

import "~/styles/globals.css";

import { Inter } from "next/font/google";

import AuthProvider from "./auth-provider";
import { Toaster } from "~/shared/ui/sonner";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`font-sans antialiased ${inter.variable} overflow-hidden bg-background`}
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
