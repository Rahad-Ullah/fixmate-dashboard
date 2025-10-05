/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IMAGE_URL } from "@/config/env-config";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const TopServiceProviders = ({ users = [] }: { users: any }) => {
  console.log(users);
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
                <p className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Star className="text-amber-500 size-5" />
                    <Star className="text-amber-500 size-5" />
                    <Star className="text-amber-500 size-5" />
                    <Star className="text-amber-500 size-5" />
                    <Star className="text-amber-500 size-5" />
                  </span>
                  <span className="text-lg font-medium text-stone-500">
                    (150)
                  </span>
                </p>
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
