import LogoIcon from "@/components/icons/logo";
import GoogleButton from "../app/_components/google-button";
import SignInForm from "../app/_components/signin-form";
import { Link } from "@/navigation";

export default function SignInPage() {
  return (
    <main className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto grid w-[395px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your username below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <SignInForm />
            <GoogleButton />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden place-content-center bg-muted/50 lg:block">
        <LogoIcon className="absolute left-[50%] top-[50%] z-50 size-[25%] translate-x-[-50%] translate-y-[-50%] text-foreground dark:text-background" />
      </div>
    </main>
  );
}
