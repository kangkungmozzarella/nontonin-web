import React from 'react';
import { CITIES } from 'common/api/mock/data';
import { haversineKm } from 'common/helpers/format';
import type { CityModel } from 'api-hooks/cities/model';

export type Coords = { lat: number; lng: number };
type Status = 'unknown' | 'granted' | 'denied' | 'unsupported';

interface LocationContextValue {
  coords: Coords | null;
  status: Status;
  // Asks the browser for a position; resolves null when refused or unavailable
  request: () => Promise<Coords | null>;
}

const LocationContext = React.createContext<LocationContextValue>({
  coords: null,
  status: 'unknown',
  request: async () => null,
});

function readPosition(): Promise<Coords | null> {
  return new Promise((resolve) =>
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => resolve(null),
      { maximumAge: 10 * 60_000, timeout: 10_000 },
    ),
  );
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = React.useState<Coords | null>(null);
  const [status, setStatus] = React.useState<Status>('unknown');

  // If permission was granted on an earlier visit, read the position quietly
  React.useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported');
      return;
    }
    navigator.permissions
      ?.query({ name: 'geolocation' })
      .then(async (p) => {
        if (p.state === 'granted') {
          setStatus('granted');
          setCoords(await readPosition());
        } else if (p.state === 'denied') setStatus('denied');
      })
      .catch(() => {});
  }, []);

  const request = React.useCallback(async () => {
    if (!('geolocation' in navigator)) return null;
    const c = await readPosition();
    setStatus(c ? 'granted' : 'denied');
    setCoords(c);
    return c;
  }, []);

  const value = React.useMemo(
    () => ({ coords, status, request }),
    [coords, status, request],
  );
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export const useUserLocation = () => React.useContext(LocationContext);

export function nearestCity(c: Coords): CityModel {
  return CITIES.reduce((best, city) =>
    haversineKm(c, city) < haversineKm(c, best) ? city : best,
  );
}
