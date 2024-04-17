import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="mt-10 flex justify-center">Not logged in</div>;
  }

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, session.user.tg_id),
  });

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1>{session.user.name}</h1>
      {/* <h1 className="max-w-[300px] truncate">{user?.image}</h1> */}
      <pre>
        <blockquote>{JSON.stringify(session.user)}</blockquote>
      </pre>
      <h1>{user?.id}</h1>
      <h1>{user?.username}</h1>
      <h1>{user?.photo_url}</h1>
    </div>
  );
}
