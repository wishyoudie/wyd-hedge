"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/button/submit-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/server/actions";

export default function CategoryTreePlaceholder(props: { rootId: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = () => {
    setDialogOpen(false);
    toast("Added Category");
  };

  return (
    <div className="flex h-[93%] flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no categories
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start sorting your transactions as soon as you add a category.
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button className="mt-4">Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
            </DialogHeader>
            <form action={createCategory} className="grid gap-4 p-4">
              <div className="grid items-center gap-1.5">
                <Input type="hidden" name="parentId" value={props.rootId} />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" placeholder="Food" />
              </div>
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
