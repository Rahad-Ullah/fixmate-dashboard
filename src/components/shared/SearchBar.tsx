"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";

const SearchBar = () => {
  const search = useSearchParams().get("search");
  const updateSearchParam = useUpdateMultiSearchParams();
  return (
    <div className="relative hidden md:block">
      <Input
        id="search"
        placeholder="Search"
        className="rounded-full bg-white px-5 h-10 placeholder:text-[#B6B6B6]"
        size={40}
        defaultValue={search || ""}
        onChange={(e) =>
          updateSearchParam({ search: e.target.value, page: null })
        }
      />
      <Search className="absolute right-3 top-2 text-zinc-500" />
    </div>
  );
};

export default SearchBar;
