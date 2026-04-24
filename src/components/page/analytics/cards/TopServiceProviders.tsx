"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { IMAGE_URL } from "@/config/env-config";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import Modal from "@/components/modals/Modal";
import UserDetails from "@/components/page/users/userDetails/UserDetails";

const TopServiceProviders = ({ users = [] }: { users: any }) => {
  return (
    <Card className="p-4 flex flex-col gap-5 h-full">
      <h1 className="text-xl font-bold">Top Service Provider</h1>
      <section className="flex flex-col gap-4 overflow-y-auto max-h-[420px] pr-2 custom-scrollbar">
        {users?.map((user: any, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow bg-white"
          >
            <div className="flex-shrink-0">
              <Image
                src={
                  (user?.image && `${IMAGE_URL}${user?.image}`) || "/avatar.png"
                }
                alt="avatar"
                width={56}
                height={56}
                className="size-14 rounded-full object-cover"
              />
            </div>
            <div className="w-full overflow-hidden">
              <h3 className="text-base font-semibold truncate">{user?.name}</h3>
              <h4 className="text-sm text-stone-600 truncate">
                {user?.category || user?.expertise}
              </h4>
              <div className="flex justify-between items-center gap-2 mt-1">
                <div className="flex items-center gap-2">
                  <Rating
                    value={user?.avgRating}
                    readOnly
                    className="scale-75 -ml-4"
                  />
                  <span className="text-sm font-medium text-stone-400">
                    ({user?.reviewCount || 0})
                  </span>
                </div>
                <Modal
                  dialogTrigger={
                    <Button
                      size={"icon"}
                      className="rounded-full h-8 w-8 flex-shrink-0"
                    >
                      <ArrowRight strokeWidth={2.5} size={16} />
                    </Button>
                  }
                  dialogTitle=""
                  className="max-w-[100vw] lg:max-w-[70vw] max-h-[90vh] overflow-y-auto p-6"
                >
                  <UserDetails id={user?.userId || user?._id} />
                </Modal>
              </div>
            </div>
          </div>
        ))}
      </section>
    </Card>
  );
};

export default TopServiceProviders;
