import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TmaSDKLoader } from "~/src/app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} overflow-hidden`}>
        <div className="h-screen overflow-y-scroll">
          <TmaSDKLoader>{children}</TmaSDKLoader>
        </div>
      </body>
    </html>
  );
}
