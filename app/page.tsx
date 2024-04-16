import { TopNav } from "./_components/navigation/topnav";
import AuthProvider from "./auth-provider";
import Content from "./content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <AuthProvider>
      <TopNav />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Content />
      </main>
    </AuthProvider>
  );
}
