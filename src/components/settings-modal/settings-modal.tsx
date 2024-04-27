"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog/dialog";
import { changeSettings } from "~/server/actions";
import { Label } from "../label/label";
import SelectLocale from "~/widgets/settings/change-locale";
import SelectCurrency from "~/widgets/settings/change-currency";
import { SubmitButton } from "../button/submit-button";

export default function SettingsModal(props: {
  defaultValues: { locale: string; currency: string };
  userId: number;
}) {
  const router = useRouter();
  const action = changeSettings.bind(null, props.userId);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogHeader>
        <DialogTitle>Preferences</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <form className="grid gap-4 p-4" action={action}>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="locale" className="text-right">
              Language
            </Label>
            <SelectLocale
              name="locale"
              defaultValue={props.defaultValues.locale}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Default Currency
            </Label>
            <SelectCurrency
              name="currency"
              defaultValue={props.defaultValues.currency}
            />
          </div>
          <SubmitButton onClick={() => handleOpenChange(false)}>
            Save Changes
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
