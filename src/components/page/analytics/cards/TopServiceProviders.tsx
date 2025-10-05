/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import { IMAGE_URL } from "@/config/env-config";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const TopServiceProviders = ({ users = [] }: { users: any }) => {
  return (
    <Card className="p-4 flex flex-col gap-5">
      <h1 className="text-xl font-bold">Top Service Provider</h1>
      <section className="grid gap-4">
        {users?.map((user: any, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <Image
              src={
                (user?.image && `${IMAGE_URL}${user?.image}`) || "/avatar.png"
              }
              alt="avatar"
              width={75}
              height={75}
              className="rounded-full"
            />
            <div className="w-full">
              <h3 className="text-lg font-semibold">{user?.name}</h3>
              <h4 className="text-stone-700">{user?.category}</h4>
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <Rating value={user?.avgRating} readOnly />
                  <span className="text-lg font-medium text-stone-500">
                    ({user?.reviewCount})
                  </span>
                </div>
                <Button size={"icon"} className="rounded-full h-8 w-8">
                  <ArrowRight strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </Card>
  );
};

export default TopServiceProviders;
