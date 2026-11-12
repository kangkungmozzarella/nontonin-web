export interface SeatPrice {
  std: number;
  rec: number;
}

export interface SeatMapModel {
  showtimeId: string;
  taken: string[]; // seat ids such as "F8"
  price: SeatPrice;
  discountPercent: number;
}
