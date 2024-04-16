import { getServerSession } from "next-auth/next"; //!
import { authOptions } from "./api/auth/[...nextauth]/route";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="mt-10 flex justify-center">Not logged in</div>;
  }

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, session.user.id),
  });

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1>{user?.name}</h1>
      <h1 className="max-w-[300px] truncate">{user?.image}</h1>
      <h1>{user?.id}</h1>
    </div>
  );
}
