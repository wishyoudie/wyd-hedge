import type { Account } from "~/server/db/schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select/select";

type Props = {
  accounts: Account[];
};

export default function SelectAccount(props: Props) {
  return (
    <Select name="accountId" required>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.accounts.map((account) => (
            <SelectItem key={account.id} value={`${account.id}`}>
              <div className="flex items-center gap-2">
                <div
                  className="size-4 rounded-full"
                  style={{
                    backgroundColor: account.color ?? "hsl(var(--accent))",
                  }}
                />
                <span>{account.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
