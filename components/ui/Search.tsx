"use client";

import { updateParams } from "@/utils/params";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = () => {
    const params = updateParams({
      ...searchParams,
      page: "1",
      search: searchTerm,
    });

    router.push(`/movies?${params.toString()}`);
  };

  return (
    <div className="w-full flex rounded-full px-4 py-2 border border-gray-300">
      <input
        value={searchTerm}
        placeholder="Search title..."
        className="flex-1 outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button className="shrink-0 cursor-pointer" onClick={handleSearch}>
        Go
      </button>
    </div>
  );
}
