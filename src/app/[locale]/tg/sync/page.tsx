import { syncUsers } from "@/server/users";

export default async function SyncPage({
  searchParams: { link, username },
}: {
  searchParams: { link: string; username: string };
}) {
  const res = await syncUsers(link, username);

  return (
    <div>
      <pre>
        <blockquote>{JSON.stringify(res, null, 2)}</blockquote>
      </pre>
    </div>
  );
}
