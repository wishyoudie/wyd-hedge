import { cn } from "~/shared/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 ",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  rowSpan = 1,
  colSpan = 1,
  children,
}: {
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(`md:row-span-${rowSpan} md:col-span-${colSpan}`, className)}
    >
      {children}
    </div>
  );
}
