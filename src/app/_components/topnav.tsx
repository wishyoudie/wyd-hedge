import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { isTMA } from "@tma.js/sdk";

export function TopNav() {
  if (isTMA()) return <></>;

  return (
    <nav className="flex w-full items-center justify-between text-xl font-semibold">
      <div></div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
