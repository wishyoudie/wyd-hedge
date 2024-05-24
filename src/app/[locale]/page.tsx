import { Link, redirect } from "@/navigation";
import { getServerSession } from "@/app/api/auth/options";
import { unstable_setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import Image from "next/image";
import { WalletIcon } from "lucide-react";
import LogoIcon from "@/components/icons/logo";

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect("/app/dashboard");
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <LogoIcon className="size-6" />
          <span className="sr-only">Accountant</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="font-inter text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Features
          </Link>
          <Link
            className="font-inter text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="font-inter text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
          <Link
            className="font-inter text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-inter text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Take control of your finances with Accountant
                  </h1>
                  <p className="font-inter max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Effortlessly manage your income, expenses, and budgets all
                    in one place. Accountant is the ultimate financial tracker
                    for individuals and small businesses.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signin">
                    <Button>Get Started</Button>
                  </Link>
                  <Link href="#">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="font-inter inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    <WalletIcon className="mr-1 inline-block h-4 w-4" />
                    Budgeting{"\n                              "}
                  </div>
                  <h2 className="font-inter text-3xl font-bold tracking-tighter sm:text-5xl">
                    Stay on top of your spending
                  </h2>
                  <p className="font-inter max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Accountant makes it easy to track your income and expenses,
                    so you can create and stick to a budget that works for you.
                  </p>
                </div>
              </div>
              <Image
                alt="Budgeting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                alt="Reporting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="font-inter inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    <BarChartIcon className="mr-1 inline-block h-4 w-4" />
                    Reporting{"\n                              "}
                  </div>
                  <h2 className="font-inter text-3xl font-bold tracking-tighter sm:text-5xl">
                    Gain insights into your finances
                  </h2>
                  <p className="font-inter max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Accountant provides detailed reports and visualizations to
                    help you understand your spending patterns and make informed
                    financial decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="font-inter inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    <FolderSyncIcon className="mr-1 inline-block h-4 w-4" />
                    Sync{"\n                              "}
                  </div>
                  <h2 className="font-inter text-3xl font-bold tracking-tighter sm:text-5xl">
                    Connect all your accounts
                  </h2>
                  <p className="font-inter max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Accountant seamlessly integrates with your bank accounts,
                    credit cards, and other financial services to provide a
                    complete picture of your finances.
                  </p>
                </div>
              </div>
              <Image
                alt="Sync"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="font-inter text-xs text-gray-500 dark:text-gray-400">
          © 2024 Accountant. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            className="font-inter text-xs underline-offset-4 hover:underline"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="font-inter text-xs underline-offset-4 hover:underline"
            href="#"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function BarChartIcon(props: Record<string, string>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function FolderSyncIcon(props: Record<string, string>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
      <path d="M12 10v4h4" />
      <path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
      <path d="M22 22v-4h-4" />
      <path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
    </svg>
  );
}
