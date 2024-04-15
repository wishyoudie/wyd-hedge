import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "../_components/topnav";

export default function WebRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TopNav />
      {children}
    </ClerkProvider>
  );
}
