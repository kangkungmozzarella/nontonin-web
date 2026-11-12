export type FilmStatus = 'now' | 'soon';
export type AgeRating = 'SU' | '13+' | '17+' | '21+';

// Keys of the built-in demo genres; TMDB films carry localized names instead
export type Genre =
  | 'adventure'
  | 'drama'
  | 'thriller'
  | 'crime'
  | 'family'
  | 'horror'
  | 'sci-fi'
  | 'romance';

export interface FilmModel {
  id: string;
  title: string;
  status: FilmStatus;
  releaseDate?: string; // yyyy-MM-dd
  genres: string[]; // localized names
  synopsis: string; // in the requested language, falling back to English
  score: number | null; // 0–10
  poster: string; // image URL
  backdrop: string; // image URL
  // Larger frame shown on the cinema screen in the 3D preview
  screenFrame: string;
  // Only present on the detail endpoint
  duration: number | null; // minutes
  rating: AgeRating | null;
  director: string | null;
  cast: string[];
}
