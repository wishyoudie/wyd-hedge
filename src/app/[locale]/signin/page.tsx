import LogoIcon from "@/components/icons/logo";
import GoogleButton from "./google";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import { Suspense } from "react";

export default function SignInPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <Suspense>
      <main className="h-screen w-full lg:grid lg:grid-cols-2">
        <div className="flex h-full items-center justify-center">
          <div className="mx-auto grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Use one of the providers to get started with Accountant
              </p>
            </div>
            <div className="grid gap-4">
              <GoogleButton />
            </div>
          </div>
        </div>
        <div className="relative hidden place-content-center bg-muted/50 lg:block">
          <LogoIcon className="absolute left-[50%] top-[50%] z-50 size-[25%] translate-x-[-50%] translate-y-[-50%] text-foreground dark:text-background" />
        </div>
      </main>
    </Suspense>
  );
}
