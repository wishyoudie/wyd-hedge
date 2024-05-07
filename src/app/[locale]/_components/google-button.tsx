"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function GoogleButton() {
  const searchParams = useSearchParams();

  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: searchParams.get("callbackUrl") ?? "/dashboard",
        })
      }
    >
      Sign In With Google
    </Button>
  );
}
