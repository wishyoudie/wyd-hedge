import { Card, CardHeader } from "~/shared/ui/card";
import Welcome from "./wel";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Welcome />
        <Card>
          <CardHeader>
            <Link href="/">Home</Link>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
