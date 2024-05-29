"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Account } from "@/server/db/types";
import ValueCard from "./value-card";
import { useState } from "react";
import ColorCircle from "@/components/ui/color-circle";

export default function InputValue({ accounts }: { accounts: Account[] }) {
  const [currency, setCurrency] = useState<string>();

  const handleSelectChange = (value: string) => {
    const targetAccount = accounts.find(
      (account) => `${account.id}` === value,
    )!;
    setCurrency(targetAccount.currency!);
  };

  return (
    <>
      <ValueCard className="col-span-3 lg:col-span-2" currency={currency} />
      <Card className="col-span-3 lg:col-span-1">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="accountId" className="invisible">
                Select account
              </Label>
              <Select name="accountId" onValueChange={handleSelectChange}>
                <SelectTrigger aria-label="Select account">
                  <SelectValue placeholder="Choose Account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem
                      key={account.id}
                      value={`${account.id}`}
                      className="w-full"
                    >
                      <span className="flex max-w-full flex-1 items-center gap-2">
                        <ColorCircle size={15} color={account.color} />
                        {account.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
