import { getUserAccounts } from "~/server/accounts";
import {
  Card,
  CardContent,
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
import { getTranslations } from "next-intl/server";

type Props = {
  userId: number;
};

export default async function AccountsCard(props: Props) {
  const t = await getTranslations("web.accounts");
  const accounts = await getUserAccounts(props.userId);
  const settings = await getUserSettings(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("cardTitle")}</span>
          <span>
            {accounts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <PlusIcon className="mr-2 size-4" />
                    {t("buttonShort")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountItem
              key={account.id}
              {...account}
              user={{ currency: settings.currency }}
            />
          ))
        ) : (
          <Link href="/web/account/new">
            <Button className="w-full">{t("buttonLong")}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
