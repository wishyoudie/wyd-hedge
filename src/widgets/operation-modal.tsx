"use client";

import { useRouter } from "next/navigation";
import type { Operation } from "~/server/db/schema";
import { Dialog, DialogContent } from "~/shared/ui/dialog";

export default function OperationModal(props: { operation?: Operation }) {
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
          <blockquote>{JSON.stringify(props.operation, null, " ")}</blockquote>
        </pre>
      </DialogContent>
    </Dialog>
  );
}
