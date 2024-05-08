import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("web");

  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t("footerText")}
          <a
            href="https://t.me/wishyoudie"
            className="font-medium underline underline-offset-4"
          >
            @wishyoudie
          </a>
        </p>
      </div>
    </footer>
  );
}
