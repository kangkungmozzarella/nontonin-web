import type { CinemaModel } from 'api-hooks/cinemas/model';
import type { FilmModel } from 'api-hooks/films/model';

export interface ShowtimeModel {
  id: string;
  cinemaId: string;
  filmId: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm
  studio: number;
  isPast: boolean;
}

export interface FilmScheduleModel {
  cinema: CinemaModel;
  showtimes: ShowtimeModel[];
}

export interface CinemaScheduleModel {
  film: FilmModel;
  showtimes: ShowtimeModel[];
}
