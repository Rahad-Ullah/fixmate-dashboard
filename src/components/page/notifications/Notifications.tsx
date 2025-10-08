/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { myFetch } from "@/utils/myFetch";
import { Bell } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Notifications = ({ data, meta }: { data: any[]; meta: any }) => {
  const updateSearchParams = useUpdateMultiSearchParams();
  const [notifications, setNotifications] = React.useState<any[]>([]);

  // display more notifications on scroll
  useEffect(() => {
    if (data) {
      setNotifications((prev) =>
        meta?.page === 1 ? data : [...prev, ...data]
      );
    }
  }, [meta?.page]);

  // infinite scroll
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;
    const handleScroll = () => {
      if (
        observerRef.current &&
        window.innerHeight + window.scrollY >=
          observerRef.current.offsetTop +
            observerRef.current.offsetHeight -
            100 &&
        meta?.totalPages > meta?.page
      ) {
        updateSearchParams({ page: meta?.page + 1 });
      }
    };
    observerRef?.current?.addEventListener("scroll", handleScroll);
    return () =>
      observerRef?.current?.removeEventListener("scroll", handleScroll);
  }, [meta?.page, meta?.totalPages]);

  // mark notification as read
  const markAsRead = async (id: string) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification?._id === id) {
        return { ...notification, isRead: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);

    // mark notification as read on the backend
    try {
      await myFetch(`/notification/markAllAsRead`, {
        method: "PATCH",
        body: { ids: [id] },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid gap-4">
      {notifications?.map((notification: any, idx: number) => (
        <div
          key={idx}
          onClick={() => markAsRead(notification?._id)}
          className="flex justify-between items-center gap-4 bg-white p-3 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <span className="p-2 bg-secondary-foreground rounded-lg w-fit">
              <Bell />
            </span>
            <div>
              <h1
                className={`text-lg text-secondary ${
                  notification?.isRead ? "font-medium" : "font-semibold"
                }`}
              >
                {notification?.message}
              </h1>
            </div>
          </div>
          <p className="text-[#707070]">
            {new Date(notification?.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Notifications;
