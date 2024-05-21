import { getServerSession } from "@/app/api/auth/options";
import type { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const session = await getServerSession();

  return (
    <div>
      <pre>
        <blockquote>{JSON.stringify(session, null, 2)}</blockquote>
      </pre>
    </div>
  );
}
