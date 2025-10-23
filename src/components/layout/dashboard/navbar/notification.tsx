import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { Bell } from "lucide-react";
import Link from "next/link";

const Notification = async () => {
  const notificationsRes = await myFetch(`/notification?status=unRead`, {
    tags: ["notifications"],
    cache: "no-store",
  });
  const unreadCount = notificationsRes?.data?.meta?.total || 0;

  return (
    <Link href={"/notifications"}>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-[#008000] rounded-full relative"
      >
        <Bell className="size-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 left-5 px-2 text-[10px] text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default Notification;
