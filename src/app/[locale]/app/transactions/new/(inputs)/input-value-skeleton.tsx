import { Skeleton } from "@/components/ui/skeleton";
import ValueCard from "./value-card";

export default function InputValueSkeleton() {
  return (
    <>
      <ValueCard className="col-span-3 lg:col-span-2" />
      <Skeleton className="col-span-3 lg:col-span-1" />
    </>
  );
}
