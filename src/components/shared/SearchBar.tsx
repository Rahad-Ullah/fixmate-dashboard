"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchTerm = useSearchParams().get("searchTerm");
  const updateSearchParam = useUpdateSearchParams();
  return (
    <div className="relative hidden md:block">
      <Input
        id="search"
        placeholder="Search"
        className="rounded-full bg-white px-5 h-10 placeholder:text-[#B6B6B6]"
        size={40}
        defaultValue={searchTerm || ""}
        onChange={(e) => updateSearchParam("searchTerm", e.target.value)}
      />
      <Search className="absolute right-3 top-2 text-zinc-500" />
    </div>
  );
};

export default SearchBar;
