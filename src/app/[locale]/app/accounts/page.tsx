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

  if (accounts.length === 0) {
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
      <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedAccounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </main>
  );
}
