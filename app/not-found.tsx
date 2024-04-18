import Link from "next/link";
import { Button } from "~/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/shared/ui/card";
import Logo from "~/shared/ui/logo";

export default function NotFound() {
  return (
    <main className="container flex h-screen items-center justify-center">
      <Card className="max-h-[50%]">
        <CardHeader className="flex scroll-m-20 flex-row items-center justify-center gap-4 text-2xl font-semibold tracking-tight">
          <Logo size={10} />
          <span>Not Found</span>
        </CardHeader>
        <CardContent>
          The page you are trying to visit does not exist.
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full" variant="outline">
              Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
