import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Settings from "@/shared/lib/settings";
import { SubmitButton } from "@/components/button/submit-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TelegramButton from "@/components/telegram-button/telegram-button";
import { env } from "@/env";

export default function SettingsPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Settings
          </h1>
        </div>
        <div className="flex-1 lg:w-[42rem]">
          <div className="space-y-6">
            <Separator />
            <form className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Label className="text-lg">Preferences</Label>
                  </CardTitle>
                  <CardDescription>
                    Customize Accountant&apos;s behavior.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4 py-4">
                    <Label className="col-span-1 text-right">
                      Default currency
                    </Label>
                    <Select name="currency" defaultValue="rub">
                      <SelectTrigger className="col-span-2">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Label className="text-lg">Telegram</Label>
                  </CardTitle>
                  <CardDescription>
                    Sync your account with Telegram to create shared
                    environment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 items-center gap-4 pt-4">
                    <Label className="col-span-1 text-right">Username</Label>
                    <Input
                      className="col-span-2"
                      type="text"
                      name="username"
                      placeholder="wishyoudie"
                    />
                  </div>
                  <p className="mx-2 mt-2 text-[0.8rem] text-muted-foreground">
                    Make sure to set your actual username. Otherwise, we
                    don&apos;t guarantee your privacy.
                  </p>
                  <div className="grid grid-cols-3 items-center gap-4 pt-4">
                    <Label className="col-span-2 text-right">
                      Alternatively, you can use Telegram OAuth:
                    </Label>
                    <div className="col-span-1">
                      <TelegramButton botUsername={env.BOT_USERNAME} />
                    </div>
                  </div>
                  <Separator />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    <Label className="text-lg">Premium</Label>
                  </CardTitle>
                  <CardDescription>
                    Unlock full potential with premium subscription.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="py-4">
                    <Button>Buy Premium</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="pt-4">
                <SubmitButton
                  size="lg"
                  className="w-full"
                  toastMessage="Success"
                  toastDescription="Updated settings"
                >
                  Save
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
