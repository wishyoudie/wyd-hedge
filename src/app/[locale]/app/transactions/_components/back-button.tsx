"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
}
