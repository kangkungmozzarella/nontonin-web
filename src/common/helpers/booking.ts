import { parse } from 'date-fns';
import type { BookingModel } from 'api-hooks/bookings/model';

// A ticket stays "upcoming" until three hours after the show starts
export function isUpcoming(b: BookingModel, now = new Date()) {
  const start = parse(`${b.date} ${b.time}`, 'yyyy-MM-dd HH:mm', new Date());
  return start.getTime() + 3 * 3600_000 > now.getTime();
}

export function byShowTime(a: BookingModel, b: BookingModel) {
  return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
}
