import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import BackButton from "~/_components/back-button";
import ColorSelect from "../../_components/color-select";
import { patchAccount } from "@/server/actions";
import Settings from "@/shared/lib/settings";
import { SubmitButton } from "@/components/button/submit-button";
import { getAccountById } from "@/server/accounts";

export default async function AccountViewPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const account = await getAccountById(id);

  if (!account) return;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {account.name}
          </h1>
        </div>
        <div className="flex-1 lg:w-[42rem]">
          <div className="space-y-6">
            <Separator />
            <form className="space-y-4" action={patchAccount}>
              <input type="hidden" name="id" value={account.id} />
              <input type="hidden" name="userId" value={account.userId} />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Label className="text-lg">Name</Label>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Tinkoff Black"
                    className="w-full rounded-lg bg-background"
                    defaultValue={account.name!}
                  />
                  <p className="mx-2 mt-2 text-[0.8rem] text-muted-foreground">
                    You need to add name to your account. It does not have to be
                    unique, but try to make it identifiable for you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Label className="text-lg">Value</Label>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      name="value"
                      defaultValue={account.value}
                      placeholder="1000"
                      className="flex-1 rounded-lg bg-background"
                    />
                    <Select name="currency" defaultValue={account.currency!}>
                      <SelectTrigger className="flex w-[10rem]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Settings.currencies.map((cur) => (
                          <SelectItem value={cur} key={cur}>
                            {cur.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="mx-2 mt-2 text-[0.8rem] text-muted-foreground">
                    We expect you to have had some accounts before you started
                    using Accountant. Therefore, you can set initial value.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Label className="text-lg">Color</Label>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ColorSelect defaultValue={account.color ?? undefined} />
                  <p className="mx-2 mt-2 text-[0.8rem] text-muted-foreground">
                    You can attach color to your account for easier visual
                    identification.
                  </p>
                </CardContent>
              </Card>
              <div className="pt-4">
                <SubmitButton
                  className="w-full"
                  size="lg"
                  toastMessage="Success"
                  toastDescription="Changes applied"
                >
                  Save Changes
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
