"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export default function CopyButton({ value, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click or other parent events
    if (!value) return;
    
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard", {
      id: "copy-id", // Single toast for multiple clicks
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={onCopy}
      title="Copy to clipboard"
      className={`p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-primary ${className}`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
