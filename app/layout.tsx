import ThemeProvider from "~/app/theme/theme-provider";
import Nav from "./_components/navigation/topnav";

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
      <html lang="en">
        <body className={`font-sans ${inter.variable} overflow-hidden`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <div className="h-screen overflow-y-scroll">{children}</div> */}
            <Nav />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
