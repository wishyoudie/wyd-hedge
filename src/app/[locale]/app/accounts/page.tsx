import {
  getUserAccountsWithLastTransaction,
  sortAccountsByLastTransaction,
} from "@/server/accounts";
import AccountCard from "../_components/account-card";
import { Input } from "@/components/ui/input";
import { LayoutGrid, LayoutList, Search } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export default async function AccountsPage() {
  const accounts = await getUserAccountsWithLastTransaction();
  const sortedAccounts = accounts.sort(sortAccountsByLastTransaction);

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
        <ToggleGroup type="single" defaultValue="grid">
          <ToggleGroupItem value="grid">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Link href="/app/accounts/new">
          <Button>New</Button>
        </Link>
      </div>
      <div className="grid gap-4 py-4 md:grid-cols-3 xl:grid-cols-3">
        {sortedAccounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </main>
  );
}
