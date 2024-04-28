"use client";

import { useRouter } from "~/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog/dialog";
import { createOperation } from "~/server/actions";
import { Label } from "../label/label";
import { SubmitButton } from "../button/submit-button";
import SelectAccount from "~/widgets/operations/change-account";
import { toast } from "sonner";
import { Input } from "../input/input";
import type { Account } from "~/server/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs/tabs";
import { useTranslations } from "next-intl";

export default function NewOperationModal(props: {
  userId: number;
  accounts: Account[];
}) {
  const router = useRouter();
  const action = createOperation.bind(null, props.userId);
  const t = useTranslations("web.operations");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const handleSubmit = () => {
    handleOpenChange(false);
    toast(t("toastText"));
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("modalTitle")}</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 p-4" action={action}>
          <Tabs defaultValue="expense">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense">{t("expense")}</TabsTrigger>
              <TabsTrigger value="income">{t("income")}</TabsTrigger>
            </TabsList>
            <TabsContent value="expense">
              <input hidden name="type" value="expense" />
            </TabsContent>
            <TabsContent value="income">
              <input hidden name="type" value="income" />
            </TabsContent>
          </Tabs>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="col-span-1 text-right">
              {t("name")}
            </Label>
            <Input
              className="col-span-3"
              name="name"
              type="text"
              placeholder="Enter your name here..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="col-span-1 text-right">
              {t("value")}
            </Label>
            <Input
              className="col-span-3"
              name="value"
              type="number"
              placeholder="Enter your value"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountId" className="col-span-1 text-right">
              {t("account")}
            </Label>
            <SelectAccount userId={props.userId} accounts={props.accounts} />
          </div>
          <SubmitButton onClick={handleSubmit}>{t("buttonText")}</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
