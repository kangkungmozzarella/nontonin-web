import React from 'react';
import { mockServer } from 'common/api/mock/server';
import {
  BrowserStorageKeys,
  browserStorage,
} from 'common/repositories/browser-storage';
import type { BookingModel } from 'api-hooks/bookings/model';

interface BookingsContextValue {
  bookings: BookingModel[];
  ready: boolean;
  add: (b: BookingModel) => void;
}

const BookingsContext = React.createContext<BookingsContextValue>({
  bookings: [],
  ready: false,
  add: () => {},
});

export function BookingsProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = React.useState<BookingModel[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const saved = browserStorage.getJson<BookingModel[]>(
      BrowserStorageKeys.Bookings,
      [],
    );
    mockServer.restoreBookings(saved); // keep seats bought earlier marked as taken
    setBookings(saved);
    setReady(true);
  }, []);

  const add = React.useCallback((b: BookingModel) => {
    setBookings((prev) => {
      const next = [b, ...prev];
      browserStorage.setJson(BrowserStorageKeys.Bookings, next);
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ bookings, ready, add }),
    [bookings, ready, add],
  );
  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
}

export const useBookings = () => React.useContext(BookingsContext);
