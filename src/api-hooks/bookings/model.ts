import type { FilmModel } from 'api-hooks/films/model';

export type PaymentMethod = 'ewallet' | 'qris' | 'va' | 'card';

export interface BookingModel {
  id: string;
  code: string;
  showtimeId: string;
  filmId: string;
  cinemaId: string;
  // Snapshot at purchase time, so tickets still render after a film leaves the catalogue
  filmTitle: string;
  poster: string;
  backdrop: string;
  cinemaName: string;
  date: string;
  time: string;
  studio: number;
  seats: string[];
  subtotal: number;
  discount: number;
  fee: number;
  total: number;
  payment: PaymentMethod;
  createdAt: string; // ISO
}

export interface CreateBookingInput {
  showtimeId: string;
  seats: string[];
  payment: PaymentMethod;
  film: Pick<FilmModel, 'title' | 'poster' | 'backdrop'>;
}
