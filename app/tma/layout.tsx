import { TmaSDKLoader } from "../_components/tma/TmaSDKLoader";

export default function TMARootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TmaSDKLoader>{children}</TmaSDKLoader>;
}