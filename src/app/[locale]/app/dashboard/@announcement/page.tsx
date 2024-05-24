import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/navigation";
import { getAnnouncement } from "@/server/announcement";
import Image from "next/image";
import React from "react";

export default async function AnnouncementPage() {
  const announcement = await getAnnouncement();

  if (!announcement) {
    return null;
  }

  return (
    <Card className="sm:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <CardHeader className="pb-3">
            {announcement.title && <CardTitle>{announcement.title}</CardTitle>}
            {announcement.description && (
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                {announcement.description}
              </CardDescription>
            )}
          </CardHeader>
          {announcement.href && (
            <CardFooter>
              <Link href={"/app" + announcement.href}>
                <Button>{announcement.label}</Button>
              </Link>
            </CardFooter>
          )}
        </div>
        <div className="relative h-20 w-40">
          {announcement.img && (
            <Image
              src={announcement.img}
              // width={100}
              // height={100}
              objectFit="contain"
              fill
              alt="Announcement image"
            />
          )}
        </div>
      </div>
    </Card>
  );
}
