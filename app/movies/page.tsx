import Filter from "@/components/movies/Filters";
import MoviesList from "@/components/movies/MoviesList";
import Pagination from "@/components/movies/Pagination";
import Header from "@/components/ui/Header";
import PageContentWrapper from "@/components/ui/PageContentWrapper";
import { Genre, Movie } from "@/types/movie";
import { apiFetch } from "@/utils/fetch";

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    genre?: string;
  };
}

interface MoviesResponse {
  data: Movie[];
  totalPages: number;
}

interface GenreResponse {
  data: Genre[];
  totalPages: number;
}

const FALLBACK_RESPONSE = { data: [], totalPages: 0 };

export default async function Movies({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = new URLSearchParams({
    page: params.page || "1",
    ...(params.search ? { search: params.search } : {}),
    ...(params.genre ? { genre: params.genre } : {}),
    ...(params.limit ? { limit: params.limit } : {}),
  }).toString();

  const genres = await apiFetch<GenreResponse>("/genres/movies", {}).catch(
    () => FALLBACK_RESPONSE
  ); // ignoring fetchall and error logic for this demo
  const results = await apiFetch<MoviesResponse>(`/movies?${query}`, {}).catch(
    (err) => {
      console.log(err);

      return FALLBACK_RESPONSE;
    }
  ); // ignoring error logic for this demo

  return (
    <div className="min-h-screen flex flex-col">
      <Header withSearch />
      <PageContentWrapper className="flex-1 flex flex-col">
        <>
          <Filter genres={genres.data} />
          <div className="">
            <MoviesList movies={results.data} />
          </div>
          <Pagination totalPages={results.totalPages} />
        </>
      </PageContentWrapper>
    </div>
  );
}
