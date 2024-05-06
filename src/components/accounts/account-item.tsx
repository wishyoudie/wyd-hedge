import { getRatedValue } from "~/server/currencies";
import type { Account } from "~/server/db/schema";
import ColorCircle from "../color-circle/color-circle";
import { getFormatter } from "next-intl/server";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../context-menu/context-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog/dialog";
import { SubmitButton } from "../button/submit-button";
import { Button } from "../button/button";
import { deleteAccount } from "~/server/actions";

export default async function AccountItem(
  props: Account & { user: { currency: string } },
) {
  const formatter = await getFormatter();
  const ratedValue = await getRatedValue(
    props.currency!,
    props.user.currency,
    props.value,
  );

  return (
    <>
      <Dialog>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex min-h-10 items-center rounded-md bg-background p-2 transition-colors hover:bg-accent">
              <ColorCircle
                color={props.color ?? "hsl(var(--accent))"}
                size={30}
              />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{props.name}</p>
                {props.currency !== props.user.currency && (
                  <p className="text-sm text-muted-foreground">
                    {formatter.number(props.value, {
                      style: "currency",
                      currency: props.currency!,
                    })}
                  </p>
                )}
              </div>
              <div className="ml-auto font-medium">
                {formatter.number(ratedValue, {
                  style: "currency",
                  currency: props.user.currency,
                })}
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <DialogTrigger>
              <ContextMenuItem>Delete</ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <p className="pt-2 text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete this
              account and all associated operations.
            </p>
            <div className="flex justify-end gap-2 ">
              <Button variant="outline">Cancel</Button>
              <form action={deleteAccount}>
                <input type="hidden" value={props.id} name="id" />
                <SubmitButton>Continue</SubmitButton>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
