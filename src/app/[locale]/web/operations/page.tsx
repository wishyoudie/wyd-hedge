import { getAllUserOperations } from "~/server/queries";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function OperationsPage() {
  const user = await getSessionUser();
  const operations = await getAllUserOperations(user!.id);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={operations} />
    </div>
  );
}
