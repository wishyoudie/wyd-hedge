import { getAnnouncement } from "@/server/announcement";
import AnnouncementBanner from "./announcement-banner";

export default async function Announcement() {
  const announcement = await getAnnouncement();
  if (!announcement) {
    return null;
  }

  return <AnnouncementBanner announcement={announcement} />;
}
