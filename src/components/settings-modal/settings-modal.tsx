"use client";

import { useRouter } from "~/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog/dialog";
import { changeSettings } from "~/server/actions";
import { Label } from "../label/label";
import SelectCurrency from "~/widgets/settings/change-currency";
import { SubmitButton } from "../button/submit-button";
import { toast } from "sonner";

type Props = {
  defaultValues: { locale: string; currency: string };
  userId: number;
  toastText: string;
  title: string;
  currency: string;
  buttonText: string;
};

export default function SettingsModal(props: Props) {
  const router = useRouter();
  const action = changeSettings.bind(null, props.userId);

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
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              {props.currency}
            </Label>
            <SelectCurrency
              name="currency"
              defaultValue={props.defaultValues.currency}
            />
          </div>
          <SubmitButton onClick={handleSubmit}>{props.buttonText}</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
