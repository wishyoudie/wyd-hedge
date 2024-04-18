import { list } from "@vercel/blob";
import { Skeleton } from "./skeleton";
import Image from "next/image";

export default async function Logo({ size = 16 }: { size?: number }) {
  const blobs = await list();
  const logo = blobs.blobs.find((blob) => blob.pathname === "icon.png");

  if (!logo) {
    return <Skeleton className={`size-${size}`} />;
  }
  return (
    <Image
      src={logo?.url}
      alt="logo"
      className="rounded-md shadow"
      width={size * 4}
      height={size * 4}
    />
  );
}
