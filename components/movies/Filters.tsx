"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PageContentWrapper from "../ui/PageContentWrapper";
import { Genre } from "@/types/movie";
import { updateParams } from "@/utils/params";

interface FilterProps {
  genres: Genre[];
}

export default function Filter({ genres }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateGenre = (genre: string) => {
    const params = updateParams({
      ...searchParams,
      page: "1",
      genre,
    });

    router.push(`?${params.toString()}`);
  };

  return (
    <PageContentWrapper className="px-4 py-4 flex justify-end">
      <select
        value={searchParams.get("genre") || ""}
        onChange={(e) => updateGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.title}>
            {genre.title}
          </option>
        ))}
      </select>
    </PageContentWrapper>
  );
}
