import { getSessionUser } from "~/shared/utils/getServerSession";
import { getAllUserOperations } from "~/server/queries";
import Link from "next/link";
import { OperationItem } from "~/entities/operation";
import OperationDetails from "./_components/details";
import { Card, CardContent } from "~/shared/ui/card";

export default async function OperationsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const user = await getSessionUser();
  if (user) {
    const operations = await getAllUserOperations(user.id);
    const selected = searchParams.sel ?? null;

    return (
      <div className="container grid grid-cols-2 gap-4 py-4">
        <section className="col-span-1">
          {operations.map((op) => (
            <Link key={op.id} href={{ query: { sel: op.id } }}>
              <OperationItem operation={op} />
            </Link>
          ))}
        </section>
        <section className="col-span-1">
          {selected ? (
            <OperationDetails
              operation={operations.find((op) => op.id === +selected)!}
            />
          ) : (
            <Card className="mt-2">
              <CardContent className="grid h-[420px] place-content-center">
                <span className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Select operation to view details
                </span>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    );
  }
}
