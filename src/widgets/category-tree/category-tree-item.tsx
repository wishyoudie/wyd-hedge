"use client";

import { Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/server/actions";

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
    switch (dialogContent) {
      case "add":
        toast("Added Subcategory");
        break;
      case "delete":
        toast("Deleted Subcategory");
        break;
      case "rename":
        toast("Renamed Subcategory");
        break;
    }
  };

  const dialogForm = () => {
    switch (dialogContent) {
      case "add":
        return (
          <>
            <DialogHeader>
              <DialogTitle>New Subcategory</DialogTitle>
            </DialogHeader>
            <form action={createCategory} className="grid gap-4 space-y-6 p-4">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="parentId">Parent</Label>
                <Input
                  type="text"
                  value={props.name === "root" ? "Default" : props.name}
                  disabled
                />
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
        );

      case "rename":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Category {props.name}</DialogTitle>
            </DialogHeader>
            <form action={updateCategory} className="grid gap-4 space-y-6 p-4">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" defaultValue={props.name} />
              </div>
              <Input type="hidden" value={attributes.id} name="id" />
              <SubmitButton onClick={handleSubmit}>Save Changes</SubmitButton>
            </form>
          </>
        );

      case "delete":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <p className="pt-2 text-sm text-muted-foreground">
                This action cannot be undone. This will permanently delete this
                category and all of its children.
              </p>
              <div className="flex justify-end gap-2 ">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <form action={deleteCategory}>
                  <Input type="hidden" value={attributes.id} name="id" />
                  <SubmitButton onClick={handleSubmit}>Continue</SubmitButton>
                </form>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {attributes.isRoot ? (
            <div
              className={`rounded-xl bg-primary py-3 text-center text-primary-foreground shadow transition-colors`}
            >
              <h3 className="font-medium">All</h3>
            </div>
          ) : (
            <div className="rounded-xl border border-input bg-background py-3 text-center shadow-sm transition-colors hover:bg-accent">
              <h3 className="font-medium">{props.name}</h3>
            </div>
          )}
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
              <DropdownMenuItem onClick={() => setDialogContent("rename")}>
                <Pencil2Icon className="mr-2 size-4" />
                Rename
              </DropdownMenuItem>
            </DialogTrigger>
          )}
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
      <DialogContent>{dialogForm()}</DialogContent>
    </Dialog>
  );
}
