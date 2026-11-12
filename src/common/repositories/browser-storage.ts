// localStorage access that never throws (private mode, blocked storage, SSR)
export enum BrowserStorageKeys {
  Language = 'nontonin.lang',
  City = 'nontonin.city',
  Bookings = 'nontonin.bookings',
  LocationAsked = 'nontonin.location-asked',
  PaymentMethod = 'nontonin.payment-method',
}

export const browserStorage = {
  get(key: BrowserStorageKeys): string | null {
    try {
      return typeof window === 'undefined'
        ? null
        : window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: BrowserStorageKeys, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // storage unavailable: the value only lives for this visit
    }
  },
  getJson<T>(key: BrowserStorageKeys, fallback: T): T {
    const raw = browserStorage.get(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  setJson(key: BrowserStorageKeys, value: unknown) {
    browserStorage.set(key, JSON.stringify(value));
  },
  // Removes everything Nontonin saved in this browser
  clearAll() {
    Object.values(BrowserStorageKeys).forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // storage unavailable: nothing was saved
      }
    });
  },
};
