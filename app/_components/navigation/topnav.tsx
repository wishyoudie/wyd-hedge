import { env } from "~/env";
import SignInButton from "./auth-buttons";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between text-xl font-semibold">
      <SignInButton botUsername={env.BOT_USERNAME} />
    </nav>
  );
}
