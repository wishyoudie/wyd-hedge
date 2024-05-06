import { getUserAccounts } from "~/server/accounts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/card/card";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import AccountItem from "../../components/accounts/account-item";
import { getUserSettings } from "~/server/settings";
import { Button } from "../../components/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu/dropdown-menu";
import { Link } from "~/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { ScrollArea } from "~/components/scroll-area/scroll-area";
import { getTotalAccountsBalance } from "~/server/currencies";

type Props = {
  userId: number;
  className?: string;
};

export default async function AccountsCard(props: Props) {
  const t = await getTranslations("web.accounts");
  const formatter = await getFormatter();
  const accounts = await getUserAccounts(props.userId);
  const settings = await getUserSettings(props.userId);

  const hasAccounts = !!accounts.length;
  const totalBalance = hasAccounts
    ? await getTotalAccountsBalance(accounts, settings.currency)
    : 0;

  return (
    <Card
      className={`flex max-h-[600px] flex-col justify-between ${!hasAccounts && "border-dashed"} ${props.className}`}
    >
      {hasAccounts ? (
        <>
          <div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{t("cardTitle")}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DotsHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href="/web/account/new">
                      <DropdownMenuItem>
                        <PlusIcon className="mr-2 size-4" />
                        {t("buttonShort")}
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <ScrollArea className="max-h-[464px]">
              <CardContent>
                {accounts.map((account) => (
                  <AccountItem
                    key={account.id}
                    {...account}
                    user={{ currency: settings.currency }}
                  />
                ))}
              </CardContent>
            </ScrollArea>
          </div>
          <CardFooter className="flex items-center rounded-b-lg border-t bg-muted/50 p-3 px-6">
            <p className="pl-11 text-sm text-muted-foreground">Total Balance</p>
            <p className="ml-auto text-2xl font-medium">
              {formatter.number(totalBalance, {
                style: "currency",
                currency: settings.currency,
              })}
            </p>
          </CardFooter>
        </>
      ) : (
        <div className="my-auto flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no accounts
          </h3>
          <p className="text-sm text-muted-foreground">
            You need to register at least one account to use Accountant.
          </p>
          <Link href="/web/account/new">
            <Button className="mt-4">{t("buttonLong")}</Button>
          </Link>
        </div>
      )}
    </Card>
  );
}
