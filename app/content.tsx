import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { db } from "~/server/db";

export default async function Content() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div>Not logged in</div>
      </div>
    );
  }

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.tg_id, session.user.tg_id),
  });

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <blockquote>{user?.username}</blockquote>
      </div>
    </div>
  );
}
