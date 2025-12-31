"use client";

import { MovieDetail as MovieDetailType } from "@/types/movie";
import Image from "next/image";
import { useState } from "react";
import PageContentWrapper from "../ui/PageContentWrapper";
import Link from "next/link";

const getDuration = (time: string) => {
  const match = time.match(/P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/);

  if (!match) {
    return "";
  }

  let duration = ``;

  if (match[1]) {
    duration += `${match[1]} hour `;
  }

  if (match[2]) {
    duration += `${match[2]} min `;
  }

  if (match[3]) {
    duration += `${match[3]} sec`;
  }

  return duration;
};

export default function MovieDetail({ movie }: { movie: MovieDetailType }) {
  const duration = getDuration(movie.duration || "");

  return (
    <PageContentWrapper className="px-3">
      <div className="flex flex-col md:flex-row gap-5">
        <MovieImage alt={movie.title} src={movie.posterUrl} />
        <div>
          <h1 className="text-2xl">{movie.title}</h1>
          {duration && <p>Duration: {duration}</p>}
          <p>Rating: {movie.ratingValue}</p>
          <p>Release Date: {movie.datePublished}</p>
          {movie.summary && <p className="mt-2 mb-4">{movie.summary}</p>}
          <p>
            Genre:{" "}
            {movie.genres?.map((genre, i) => (
              <>
                <Link
                  key={genre.id}
                  href={`/movies?genre=${genre.title}`}
                  className="underline"
                >
                  {genre.title}
                </Link>
                {i < movie.genres.length - 1 ? ", " : ""}
              </>
            ))}
          </p>
          {movie.directors?.length && (
            <p>Directors: {movie.directors?.join(", ")}</p>
          )}
          {movie.writers?.length && <p>Writers: {movie.writers?.join(", ")}</p>}
          {movie.mainActors?.length && (
            <p>Actors: {movie.mainActors?.join(", ")}</p>
          )}
        </div>
      </div>
    </PageContentWrapper>
  );
}

const FALLBACK_IMAGE = "/fallback.svg";

const MovieImage = ({ src, alt }: { src?: string; alt?: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) console.log(alt, src, hasError);
  return (
    <div className="w-75 mx-auto md:mx-0 shrink-0 aspect-2/3 bg-red-300 flex justify-center items-center overflow-hidden rounded-md">
      {
        <Image
          src={hasError || !src ? FALLBACK_IMAGE : src}
          alt={`${alt} Poster`}
          className="size-full"
          width={800}
          height={400}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      }
    </div>
  );
};


