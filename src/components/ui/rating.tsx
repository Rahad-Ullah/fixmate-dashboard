"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  className,
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const displayValue = hovered ?? value;

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        const filled = index <= displayValue;

        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            aria-label={`${index} star${index > 1 ? "s" : ""}`}
            onMouseEnter={() => !readOnly && setHovered(index)}
            onClick={() => !readOnly && onChange?.(index)}
            className={cn(
              "transition-transform",
              !readOnly && "hover:scale-110 focus:scale-110 focus:outline-none"
            )}
          >
            <Star
              className={cn(
                "h-5 w-5",
                filled
                  ? "fill-[#FFCB2B] text-[#FFCB2B]"
                  : "fill-muted stroke-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export default Rating;
