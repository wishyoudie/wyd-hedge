import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { insertOperation } from "~/server/queries";
import { Button } from "~/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import { Input } from "~/shared/ui/input";

export default async function AddOperationForm() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return (
    <Card>
      <form
        action={async (e: FormData) => {
          "use server";

          await insertOperation(session.user.id, {
            op_type: e.get("op_type")! as "expense" | "income",
            value: +e.get("value")!,
          });

          redirect("/tma");
        }}
      >
        <CardHeader>
          <CardTitle>New Operation</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Type" name="op_type" required />
          <Input placeholder="Value" name="value" type="number" required />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
