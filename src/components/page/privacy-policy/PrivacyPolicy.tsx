"use client";

import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { revalidate } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PrivacyPolicy = ({ defaultContent }: { defaultContent: string }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultContent);

  const handleUpdate = async () => {
    toast.loading("Updating...", { id: "update-policy" });
    try {
      const res = await myFetch("/admin/policy", {
        tags: ["policy"],
        method: "PATCH",
        body: { content },
      });
      if (res?.success) {
        toast.success("Privacy updated successfully", {
          id: "update-policy",
        });
        revalidate("policy");
      } else {
        toast.error(res?.message || "Failed to update", {
          id: "update-policy",
        });
      }
    } catch (error) {
      toast.error("Failed to update", { id: "update-policy" });
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <PageTitle>Privacy Policy</PageTitle>
      <Card className="p-4 shadow-sm">
        <JoditEditor
          ref={editor}
          value={content}
          config={{ height: 600, theme: "light", readonly: false }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </Card>
      <div className="flex justify-end">
        <Button
          className="bg-gradient-to-r from-primary-foreground to-primary px-10 rounded-md"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
