import TMANavbar from "~/shared/ui/tma-navbar";
import { TmaSDKLoader } from "../_components/tma/TmaSDKLoader";

export default function TMARootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TmaSDKLoader>
      <main className="overflow-y-scroll">
        {children}
        <TMANavbar />
      </main>
    </TmaSDKLoader>
  );
}
