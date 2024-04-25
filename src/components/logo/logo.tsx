import { list } from "@vercel/blob";
import { Skeleton } from "../skeleton/skeleton";

export default async function Logo({ size = 16 }: { size?: number }) {
  const blobs = await list();
  const logo = blobs.blobs.find((blob) => blob.pathname === "icon.png");

  if (!logo) {
    return <Skeleton className={`size-${size}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo?.url}
      alt="logo"
      className="rounded-xl"
      width={size * 4}
      height={size * 4}
    />
  );
}
