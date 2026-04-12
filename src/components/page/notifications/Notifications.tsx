/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PageTitle from "@/components/shared/PageTitle";
import { revalidate } from "@/helpers/revalidateHelper";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { myFetch } from "@/utils/myFetch";
import { Bell, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Notifications = ({ data, meta }: { data: any[]; meta: any }) => {
  const updateSearchParams = useUpdateMultiSearchParams();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // reset page number on refresh
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    updateSearchParams({ page: null });
  }, []);

  // display notifications
  useEffect(() => {
    if (data) {
      setNotifications((prev) =>
        meta?.page === 1 ? data : [...prev, ...data]
      );
      setIsLoading(false);
    }
  }, [data, meta?.page]);

  // ✅ infinite scroll (corrected to use container, not window)
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 200 && // near bottom
        meta?.totalPages > meta?.page &&
        !isLoading
      ) {
        setIsLoading(true);
        updateSearchParams({ page: meta?.page + 1 });
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [meta?.page, meta?.totalPages, isLoading, updateSearchParams]);

  // mark notification as read by id
  const markAsRead = async (id: string) => {
    const updatedNotifications = notifications.map((n) =>
      n?._id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);
    try {
      const res = await myFetch(`/notification/markAllAsRead`, {
        method: "PATCH",
        body: { ids: [id] },
      });
      if (res?.success) revalidate("notifications");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col gap-6 px-4">
      <section className="flex justify-between items-center">
        <PageTitle>Notifications</PageTitle>
      </section>

      <section
        className="grid gap-4 flex-1 max-h-[78vh] overflow-y-scroll"
        ref={observerRef}
      >
        {notifications?.map((notification: any, idx: number) => (
          <div
            key={idx}
            onClick={() => markAsRead(notification?._id)}
            className="flex justify-between items-center gap-4 bg-white p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <span className="p-2 bg-secondary-foreground text-gray-500 rounded-lg w-fit">
                <Bell />
              </span>
              <div>
                <h1
                  className={`text-lg text-secondary ${
                    notification?.isRead
                      ? "font-medium text-gray-500"
                      : "font-semibold"
                  }`}
                >
                  {notification?.message}
                </h1>
              </div>
            </div>
            <p className="text-[#707070] text-sm">
              {new Date(notification?.createdAt).toLocaleString()}
            </p>
          </div>
        ))}

        {/* 👇 Loader shown when fetching new page */}
        {isLoading && (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin text-primary w-6 h-6" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && notifications?.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No notifications found
          </p>
        )}
      </section>
    </div>
  );
};

export default Notifications;
