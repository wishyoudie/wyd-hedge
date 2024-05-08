import { Link, redirect } from "@/navigation";
import { getServerSession } from "@/app/api/auth/options";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
// import NextLink from "next/link";
// import { env } from "@/env";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user;
  const t = await getTranslations("web.loggedoff");

  if (user) {
    redirect("/app/dashboard");
  }

  return (
    <Card className="mx-auto my-20 flex max-w-[980px] flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-12 lg:py-20">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        {t("slogan")}
      </h1>
      <span className="max-w-[750px] text-center align-top text-lg text-muted-foreground sm:text-xl md:py-4">
        {t("description")}
      </span>
      <div className="flex w-full flex-col items-center justify-center gap-4 py-4 md:flex-row md:pb-10">
        <Link href="/signup">
          <Button className="text-md h-10 w-[225px] rounded-xl pb-[13px] pt-[11px] md:w-[200px]">
            Sign Up
          </Button>
        </Link>
        <Link href="/signin">
          <Button
            className="text-md h-10 w-[225px] rounded-xl pb-[13px] pt-[11px] md:w-[200px]"
            variant="secondary"
          >
            Login
          </Button>
        </Link>
        {/* <NextLink href={env.MINI_APP_URL} target="_blank">
          <Button
            className="text-md h-10 w-[225px] rounded-xl pb-[13px] pt-[11px] md:w-[200px]"
            variant="secondary"
          >
            {t("open")}
          </Button>
        </NextLink> */}
      </div>
    </Card>
  );
}
