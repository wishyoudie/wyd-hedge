"use client";

import { SubmitButton } from "@/components/button/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/navigation";
import { deleteAccount } from "@/server/actions";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountDropdown(props: { accountId: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteSubmit = () => {
    setDialogOpen(false);
    toast("Success", {
      description: "Account deleted.",
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto" size="icon" variant="ghost">
            <DotsHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => router.push(`/app/accounts/${props.accountId}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="pt-2 text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete this
            account and all associated transactions.
          </p>
          <div className="flex justify-end gap-2 ">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <form action={deleteAccount}>
              <Input type="hidden" value={props.accountId} name="id" />
              <SubmitButton onClick={handleDeleteSubmit}>Continue</SubmitButton>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
