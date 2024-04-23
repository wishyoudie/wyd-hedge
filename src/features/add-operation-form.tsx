import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { insertOperation } from "~/server/queries";
import { Button } from "~/shared/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/shared/ui/dialog";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/select";

export default async function AddOperationForm(props: { redirect: string }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return (
    <form
      action={async (formData: FormData) => {
        "use server";

        if (isNaN(Number(formData.get("value")))) {
        } else {
          const data = {
            name: formData.get("name") as string,
            op_type: formData.get("op_type")! as "expense" | "income",
            value: +formData.get("value")!,
            currency: formData.get("currency") as string,
          };

          await insertOperation(session.user.id, data);

          redirect(props.redirect);
        }
      }}
    >
      <DialogHeader>
        <DialogTitle>New Operation</DialogTitle>
        <DialogDescription>
          Create your new operation here. Click save when youre done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input name="name" className="col-span-3" />
        </div>
        <div className="">
          <Select name="op_type" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select name="currency" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="RUB">RUB</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="value" className="text-right">
            Value
          </Label>
          <Input name="value" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
