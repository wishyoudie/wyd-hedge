import TabBar from "../_components/tab-bar";

export default function TelegramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TabBar />
    </>
  );
}
