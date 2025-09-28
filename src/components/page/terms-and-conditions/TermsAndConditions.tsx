"use client";

import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleUpdate = () => {
    console.log("Updated Content:", content);
    // Add your update logic here
  };

  return (
    <section className="flex flex-col gap-4">
      <PageTitle>Terms & Condition</PageTitle>
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

export default TermsAndConditions;
