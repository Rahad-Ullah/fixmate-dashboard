"use client";

import PageTitle from "@/components/shared/PageTitle";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { revalidate } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { useState } from "react";
import toast from "react-hot-toast";

const Settings = ({
  defaultSettings,
}: {
  defaultSettings: { isSubscribeActive: boolean };
}) => {
  const [isActive, setIsActive] = useState(defaultSettings.isSubscribeActive);

  const handleToggle = async (checked: boolean) => {
    setIsActive(checked);
    toast.loading("Updating settings...", { id: "update-settings" });
    try {
      const res = await myFetch("/settings", {
        tags: ["settings"],
        method: "PATCH",
        body: { isSubscribeActive: checked },
      });
      if (res?.success) {
        toast.success("Settings updated successfully", {
          id: "update-settings",
        });
        revalidate("settings");
      } else {
        setIsActive(!checked); // revert on failure
        toast.error(res?.message || "Failed to update settings", {
          id: "update-settings",
        });
      }
    } catch (error) {
      setIsActive(!checked); // revert on failure
      toast.error("Failed to update settings", { id: "update-settings" });
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <PageTitle>Settings</PageTitle>
      <Card className="p-6 shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-medium">Subscription Setting</h2>
          <p className="text-sm text-gray-500 mb-4">
            Manage the subscription status for the application.
          </p>
          <div className="flex items-center space-x-2">
            <Switch
              id="subscription-status"
              checked={isActive}
              onCheckedChange={handleToggle}
            />
            <Label htmlFor="subscription-status"
              className={isActive ? "text-primary font-medium" : "text-gray-500"}
            >
              {isActive ? "Subscription is Active" : "Subscription is Inactive"}
            </Label>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Settings;
