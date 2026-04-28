"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { Bell } from "lucide-react";
import Link from "next/link";
import { io } from "socket.io-client";

const Notification = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [authId, setAuthId] = useState<string | null>(null);

  const fetchUnreadCount = async () => {
    try {
      const unreadRes = await myFetch(`/notification/unread-count`);
      if (unreadRes?.success) {
        setUnreadCount(unreadRes?.data?.unreadCount ?? 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  };

  useEffect(() => {
    // Fetch profile for authId
    const fetchProfile = async () => {
      try {
        const res = await myFetch("/user/profile");
        if (res?.success && res?.data?._id) {
          setAuthId(res.data._id);
        }
      } catch (error) {
        console.error("Failed to fetch profile for socket listener", error);
      }
    };

    fetchProfile();
    fetchUnreadCount();
  }, []);

  useEffect(() => {
    if (!authId) return;

    // Establish WebSocket connection
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://10.10.7.94:5005";
    const socket = io(serverUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket successfully connected to:", serverUrl);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    const eventName = `notification::${authId}`;
    socket.on(eventName, () => {
      console.log("Real-time notification received via:", eventName);
      fetchUnreadCount();
    });

    return () => {
      socket.off(eventName);
      socket.disconnect();
    };
  }, [authId]);

  return (
    <Link href={"/notifications"}>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-[#008000] rounded-full relative"
      >
        <Bell className="size-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 left-4 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[9px] font-bold text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default Notification;
