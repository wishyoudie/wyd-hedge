// import { TMANavbar } from "@/components/nav/tma-navbar";
import TmaSDKLoader from "@/app/[locale]/_providers/tma-provider";
import SettingsButton from "./_components/settings-button";

export default function TMARootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TmaSDKLoader>
      <main className="overflow-y-scroll">
        {children}
        {/* <TMANavbar /> */}
      </main>
      <SettingsButton />
    </TmaSDKLoader>
  );
}
