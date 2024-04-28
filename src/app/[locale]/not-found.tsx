import { Link } from "~/navigation";
import { Button } from "~/components/button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/card/card";
import Logo from "~/components/logo/logo";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("web.notfound");

  return (
    <main className="container flex h-screen items-center justify-center">
      <Card className="max-h-[50%]">
        <CardHeader className="flex scroll-m-20 flex-row items-center justify-center gap-4 text-2xl font-semibold tracking-tight">
          <Logo size={10} />
          <span>{t("title")}</span>
        </CardHeader>
        <CardContent>{t("description")}</CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full" variant="outline">
              {t("home")}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
