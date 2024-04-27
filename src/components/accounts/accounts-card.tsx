import { getUserAccounts } from "~/server/accounts";
import { Card, CardContent, CardHeader, CardTitle } from "../card/card";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import AccountItem from "./account-item";
import { getUserSettings } from "~/server/settings";
import { Button } from "../button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";

type Props = {
  userId: number;
};

export default async function AccountsCard(props: Props) {
  const accounts = await getUserAccounts(props.userId);
  const settings = await getUserSettings(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Accounts</span>
          <span>
            {accounts.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <PlusIcon className="mr-2 size-4" />
                    New
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
              user={{ locale: settings.locale, currency: settings.currency }}
            />
          ))
        ) : (
          <Button>New</Button>
        )}
      </CardContent>
    </Card>
  );
}
