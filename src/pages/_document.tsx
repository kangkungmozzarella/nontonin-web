import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript forceColorScheme="dark" />
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#0B0A0E" />
        <meta
          name="description"
          content="Pesan tiket bioskop dan lihat layar dari kursimu dalam 3D sebelum memesan."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
