import React from 'react';
import { CITIES } from 'common/api/mock/data';
import {
  BrowserStorageKeys,
  browserStorage,
} from 'common/repositories/browser-storage';
import type { CityModel } from 'api-hooks/cities/model';

const DEFAULT_CITY = 'jakarta';

interface CityContextValue {
  city: CityModel;
  // false until the visitor has picked a city or one was saved earlier
  chosen: boolean;
  setCityId: (id: string) => void;
}

const CityContext = React.createContext<CityContextValue>({
  city: CITIES[0],
  chosen: false,
  setCityId: () => {},
});

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [cityId, setId] = React.useState(DEFAULT_CITY);
  const [chosen, setChosen] = React.useState(false);

  React.useEffect(() => {
    const saved = browserStorage.get(BrowserStorageKeys.City);
    if (saved && CITIES.some((c) => c.id === saved)) {
      setId(saved);
      setChosen(true);
    }
  }, []);

  const setCityId = React.useCallback((id: string) => {
    browserStorage.set(BrowserStorageKeys.City, id);
    setId(id);
    setChosen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      city: CITIES.find((c) => c.id === cityId) ?? CITIES[0],
      chosen,
      setCityId,
    }),
    [cityId, chosen, setCityId],
  );
  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export const useCity = () => React.useContext(CityContext);
