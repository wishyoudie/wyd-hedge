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
import SelectLocale from "~/widgets/settings/change-locale";
import SelectCurrency from "~/widgets/settings/change-currency";
import { SubmitButton } from "../button/submit-button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function SettingsModal(props: {
  defaultValues: { locale: string; currency: string };
  userId: number;
}) {
  const router = useRouter();
  const action = changeSettings.bind(null, props.userId);
  const t = useTranslations("web.settings");

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
          <DialogTitle>{t("long")}</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 p-4" action={action}>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="locale" className="text-right">
              {t("language")}
            </Label>
            <SelectLocale
              name="locale"
              defaultValue={props.defaultValues.locale}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              {t("currency")}
            </Label>
            <SelectCurrency
              name="currency"
              defaultValue={props.defaultValues.currency}
            />
          </div>
          <SubmitButton onClick={handleSubmit}>{t("buttonText")}</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
