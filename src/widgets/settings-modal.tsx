"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "~/shared/ui/dialog";

export default function SettingsModal(props: { user: unknown }) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent>
        <pre>
          <blockquote>{JSON.stringify(props.user, null, " ")}</blockquote>
        </pre>
      </DialogContent>
    </Dialog>
  );
}
