"use client";

import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MoviesListProps {
  movies: Array<Movie>;
}

export default function MoviesList({ movies }: MoviesListProps) {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 justify-around md:justify-between px-3">
      {!movies?.length && (
        <p className="col-span-6 text-center py-40">No movies found.</p>
      )}
      {movies?.map((movie) => (
        <Link key={movie.id} href={`/movies/detail/${movie.id}`}>
          <div className={`flex flex-col`}>
            <MovieImage src={movie.posterUrl} alt={movie.title} />
            <div className=" flex justify-between gap-4 py-3">
              <h2 className="line-clamp-1">{movie.title}</h2>
              <p>{movie.rating}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

const FALLBACK_IMAGE = "/fallback.svg";

const MovieImage = ({ src, alt }: { src?: string; alt?: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) console.log(alt, src, hasError);
  return (
    <div className="group relative w-full h-full aspect-2/3 bg-gray-50 flex justify-center items-center overflow-hidden rounded-md">
      {
        <Image
          src={hasError || !src ? FALLBACK_IMAGE : src}
          alt={`${alt} Poster`}
          className="w-full h-full"
          width={800}
          height={400}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      }
      <div className="group-hover:block hidden top-0 size-full absolute bg-linear-to-b from-transparent opacity-60 to-amber-300" />
    </div>
  );
};
