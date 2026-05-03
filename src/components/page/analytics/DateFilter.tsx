"use client";

import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Calendar, X } from "lucide-react";

function DateFilterContent() {
  const searchParams = useSearchParams();
  const updateParams = useUpdateMultiSearchParams();
  
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const handleClear = () => {
    updateParams({ startDate: null, endDate: null });
  };

  const hasFilters = Boolean(startDate || endDate);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-white border border-stone-200 rounded-lg px-4 py-2 shadow-sm transition-all hover:border-stone-300">
        <Calendar className="text-stone-400 w-4 h-4 mr-3 shrink-0" />
        
        <div className="flex items-center gap-2">
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => updateParams({ startDate: e.target.value || null })}
            className="bg-transparent border-none outline-none focus:ring-0 text-[14px] text-stone-700 w-[130px] p-0 cursor-pointer"
          />
          <span className="text-stone-300 font-medium">to</span>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => updateParams({ endDate: e.target.value || null })}
            className="bg-transparent border-none outline-none focus:ring-0 text-[14px] text-stone-700 w-[130px] p-0 cursor-pointer"
          />
        </div>

        {hasFilters && (
          <button 
            onClick={handleClear}
            className="ml-4 p-1.5 bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-500 rounded-md transition-all flex items-center justify-center shrink-0 border border-stone-200 hover:border-red-200"
            title="Clear Dates"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function DateFilter() {
    return (
        <Suspense fallback={<div className="h-11 w-[340px] bg-stone-50 animate-pulse rounded-lg border border-stone-100" />}>
            <DateFilterContent />
        </Suspense>
    )
}
