import { TmaSDKLoader } from "~/src/app";

export default function TMARootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TmaSDKLoader>{children}</TmaSDKLoader>;
}
