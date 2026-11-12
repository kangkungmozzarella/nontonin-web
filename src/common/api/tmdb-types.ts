// Response shapes from The Movie Database (https://developer.themoviedb.org).
// Only the fields the app reads are listed.

export interface TmdbListMovie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
}

export interface TmdbList {
  results: TmdbListMovie[];
}

export interface TmdbMovieDetail extends Omit<TmdbListMovie, 'genre_ids'> {
  runtime: number | null;
  genres: { id: number; name: string }[];
  credits?: {
    cast: { name: string; order: number }[];
    crew: { name: string; job: string }[];
  };
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: { certification: string }[];
    }[];
  };
}

export interface TmdbGenres {
  genres: { id: number; name: string }[];
}
