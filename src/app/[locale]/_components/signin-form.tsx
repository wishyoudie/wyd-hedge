"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "@/navigation";
import type { FormEvent } from "react";

export default function SignInForm() {
  const router = useRouter();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/dashboard");
    } else {
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <input type="text" name="username" required />
      <input type="password" name="password" required />
      <Button type="submit">Sign In</Button>
    </form>
  );
}
