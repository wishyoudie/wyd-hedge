"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "@/navigation";
import { useState, type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { useLocale } from "next-intl";

export default function SignUpForm() {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setError(null);
    setIsLoading(true);

    const formData = new FormData(evt.currentTarget);

    const res = await signIn("register", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/dashboard?tutorial=true");
    } else {
      const err: Record<string, string> = JSON.parse(res!.error!);
      setError(err[locale]);
    }

    setIsLoading(false);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Username</Label>
        <Input name="username" type="text" placeholder="wishyoudie" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Spinner size={16} className="mr-2" />}
        Sign Up
      </Button>
      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
