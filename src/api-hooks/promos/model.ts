import type { FilmModel } from 'api-hooks/films/model';

export interface PromoModel {
  id: string;
  kind: 'feature' | 'discount' | 'premiere';
  film: FilmModel;
  title: string;
  subtitle: string;
}
