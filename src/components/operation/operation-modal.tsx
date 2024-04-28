"use client";

import { useRouter } from "~/navigation";
import type { Operation } from "~/server/db/schema";
import { Dialog, DialogContent } from "~/components/dialog/dialog";

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
