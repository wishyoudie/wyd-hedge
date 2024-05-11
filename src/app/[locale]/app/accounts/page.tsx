import {
  getUserAccountsWithLastTransaction,
  sortAccountsByLastTransaction,
} from "@/server/accounts";
import { Input } from "@/components/ui/input";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { getSearchParam } from "@/shared/utils/getSearchParam";
import AccountsList from "./list";

function Placeholder() {
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed bg-background px-4 shadow-sm md:w-[600px] lg:h-[400px] lg:w-[800px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            You have no accounts
          </h2>
          <p className="text-sm text-muted-foreground">
            You need to have at least one account to use Accountant.
          </p>
          <Link href="/app/accounts/new">
            <Button className="mt-4">Create Account</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const accounts = await getUserAccountsWithLastTransaction();

  if (accounts.length === 0) {
    return <Placeholder />;
  }

  const sortedAccounts = accounts.sort(sortAccountsByLastTransaction);
  const displayType = getSearchParam(searchParams, "display", "grid");

  return (
    <main className="container">
      <div className="flex w-full items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-12 w-full rounded-lg bg-background pl-12"
          />
        </div>
        <ToggleGroup type="single" defaultValue={displayType}>
          <Link href="/app/accounts?display=grid">
            <ToggleGroupItem value="grid">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </Link>
          <Link href="/app/accounts?display=list">
            <ToggleGroupItem value="list">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
          </Link>
        </ToggleGroup>
        <Link href="/app/accounts/new">
          <Button>New</Button>
        </Link>
      </div>
      <AccountsList accounts={sortedAccounts} display={displayType} />
    </main>
  );
}
