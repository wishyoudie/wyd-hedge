"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, usePathname } from "@/navigation";

const pathnameToBreadcrumbs = (
  pathname: string,
): [string[] | null, string | null] => {
  const parts = pathname
    .split("/")
    .filter((part) => part.length > 0 && part !== "/" && part !== "app");
  console.log(parts);
  if (parts.length === 0) return [null, null];
  if (parts.length === 1) return [null, parts[0]!];

  return [parts.slice(0, parts.length - 1), parts[parts.length - 1]!];
};

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, page] = pathnameToBreadcrumbs(pathname);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs?.map((bc, i) => (
          <>
            <BreadcrumbItem key={bc}>
              <BreadcrumbLink asChild>
                <Link href={`/app/${breadcrumbs.slice(0, i).join("/")}/${bc}`}>
                  {bc}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key={`${bc}-separator`} />
          </>
        ))}
        {page && (
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
