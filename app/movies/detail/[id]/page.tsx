import Back from "@/components/movie-details/Back";
import MovieDetail from "@/components/movie-details/MovieDetail";
import Header from "@/components/ui/Header";
import PageContentWrapper from "@/components/ui/PageContentWrapper";
import { MovieDetail as MovieDetailType } from "@/types/movie";
import { apiFetch } from "@/utils/fetch";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Detail({ params }: PageProps) {
  const movieId = (await params).id;
  const results = await apiFetch<MovieDetailType>(
    `/movies/${movieId}`,
    {}
  ).catch(() => {
    return null;
  });

  return (
    <div>
      <Header withSearch />
      <PageContentWrapper className="py-4">
        <Back />
      </PageContentWrapper>
      {!results && (
        <PageContentWrapper>
          <p className="text-center py-20">Movie not found</p>
        </PageContentWrapper>
      )}
      {results && <MovieDetail movie={results} />}
    </div>
  );
}
