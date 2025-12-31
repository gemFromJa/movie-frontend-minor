export interface Movie {
  id: number;
  title: string;
  rating: string;
  posterUrl: string;
}

export interface MovieDetail extends Movie {
  summary: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
  genres: Genre[];
}

export interface Genre {
  id: string;
  title: string;
}
