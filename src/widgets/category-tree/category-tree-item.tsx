"use client";

import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/button/button";
import { SubmitButton } from "~/components/button/submit-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/dialog/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu/dropdown-menu";
import { Input } from "~/components/input/input";
import { Label } from "~/components/label/label";
import { createCategory, deleteCategory } from "~/server/actions";

type Props = {
  name: string;
  attributes: Record<string, string | number | boolean>;
};

export default function CategoryTreeItem(props: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<string>();
  const attributes = props.attributes as { id: number; isRoot: boolean };

  const handleSubmit = () => {
    setDialogOpen(false);
    toast(
      dialogContent === "add" ? "Added Subcategory" : "Deleted Subcategories",
    );
  };

  const cn = attributes.isRoot
    ? "bg-primary text-primary-foreground shadow"
    : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={`rounded-xl py-3 text-center transition-colors ${cn}`}
          >
            <h3 className="font-medium">{props.name}</h3>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger>
            <DropdownMenuItem onClick={() => setDialogContent("add")}>
              <PlusCircledIcon className="mr-2 size-4" />
              Add Subcategory
            </DropdownMenuItem>
          </DialogTrigger>
          {!attributes.isRoot && (
            <DialogTrigger>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDialogContent("delete")}
              >
                <TrashIcon className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {dialogContent === "add" ? (
          <>
            <DialogHeader>
              <DialogTitle>Subcategory</DialogTitle>
            </DialogHeader>
            <form action={createCategory} className="grid gap-4 space-y-6 p-4">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="parentId">Parent</Label>
                <Input type="text" value={props.name} disabled />
                <Input
                  type="hidden"
                  name="parentId"
                  value={`${props.attributes.id}`}
                />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" />
              </div>
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <div className="grid gap-4">
                <p className="pt-2 text-sm text-muted-foreground">
                  This action cannot be undone. This will permanently delete
                  this category and all of its children.
                </p>
                <div className="flex justify-end gap-2 ">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <form action={deleteCategory}>
                    <Input type="hidden" value={attributes.id} name="id" />
                    <SubmitButton onClick={handleSubmit}>Continue</SubmitButton>
                  </form>
                </div>
              </div>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
