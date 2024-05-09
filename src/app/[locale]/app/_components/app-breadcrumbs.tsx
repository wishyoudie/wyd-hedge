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
  const parts = pathname.split("/").filter((part) => part !== "app");
  if (parts.length === 0) return [null, null];
  if (parts.length === 1) return [null, parts[0]!];

  return [parts.slice(0, parts.length - 2), parts[parts.length - 1]!];
};

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, page] = pathnameToBreadcrumbs(pathname);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs?.map((bc) => (
          <>
            <BreadcrumbItem key={bc}>
              <BreadcrumbLink asChild>
                <Link href="#">{bc}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
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
