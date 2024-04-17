"use client";

import { Button } from "~/shared/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";

// TODO: Add trigger for login button
export default function LoggedOffCard({
  miniAppLink,
}: {
  miniAppLink: string;
}) {
  const handleMiniAppClick = () => {
    window.open(miniAppLink, "blank_");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Logged Off</CardTitle>
        <CardDescription>
          Please login with Telegram to view your Dashboard.
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-4">
        <div className="grid w-full gap-3">
          <Button className="w-full">Login</Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={handleMiniAppClick}
          >
            Open Mini App
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
