import ThemeProvider from "~/app/theme/theme-provider";

import "~/styles/globals.css";

import { Inter } from "next/font/google";

import AuthProvider from "./auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Accounting",
  description: "made by @wishyoudie",
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
        <body className={`font-sans antialiased ${inter.variable}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
