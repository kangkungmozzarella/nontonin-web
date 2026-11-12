import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'styles/globals.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { I18nextProvider } from 'react-i18next';
import i18n from 'common/i18n';
import { queryClient } from 'common/api/query-client';
import { BookingsProvider } from 'hooks/use-bookings';
import { CityProvider } from 'hooks/use-city';
import { LanguageSync } from 'hooks/use-language';
import { LocationProvider } from 'hooks/use-user-location';
import theme from 'styles/theme';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Expose the font on :root so Mantine's body styles and portals pick it up */}
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Notifications position="top-center" />
        <I18nextProvider i18n={i18n}>
          <LanguageSync />
          <QueryClientProvider client={queryClient}>
            <LocationProvider>
              <CityProvider>
                <BookingsProvider>
                  <Component {...pageProps} />
                </BookingsProvider>
              </CityProvider>
            </LocationProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </MantineProvider>
    </>
  );
}
