"use client";

import { useRouter } from "~/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog/dialog";
import { createAccount } from "~/server/actions";
import { Label } from "../ui/label";
import { SubmitButton } from "../button/submit-button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useLocale } from "next-intl";
import SelectCurrency from "~/widgets/settings/change-currency";

type Props = {
  userId: number;
  toastText: string;
  title: string;
  name: string;
  namePlaceholder: string;
  value: string;
  valuePlaceholder: string;
  buttonText: string;
};

export default function NewAccountModal(props: Props) {
  const router = useRouter();
  const locale = useLocale();
  const action = createAccount.bind(null, props.userId, locale);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const handleSubmit = () => {
    handleOpenChange(false);
    toast(props.toastText);
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 p-4" action={action}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="col-span-1 text-right">
              {props.name}
            </Label>
            <Input
              className="col-span-3"
              name="name"
              type="text"
              placeholder={props.namePlaceholder}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="col-span-1 text-right">
              {props.value}
            </Label>
            <Input
              className="col-span-3"
              name="value"
              type="number"
              placeholder={props.valuePlaceholder}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="col-span-1 text-right">
              Color
            </Label>
            <Input className="col-span-3" name="color" type="color" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="col-span-1 text-right">
              Currency
            </Label>
            <SelectCurrency name="currency" />
          </div>
          <SubmitButton onClick={handleSubmit}>{props.buttonText}</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
