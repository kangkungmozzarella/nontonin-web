import Head from 'next/head';
import React from 'react';
import { APP_NAME } from 'common/constants/app';
import AppFooter from 'components/widgets/footer/app-footer';
import AppHeader from 'components/widgets/header/app-header';
import { main, root } from './styles.css';

interface AppLayoutProps {
  title?: string;
  children: React.ReactNode;
  footer?: boolean;
}

export default function AppLayout({
  title,
  children,
  footer = true,
}: AppLayoutProps) {
  return (
    <div className={root}>
      <Head>
        <title>{title ? `${title} · ${APP_NAME}` : APP_NAME}</title>
      </Head>
      <AppHeader />
      <main className={main}>{children}</main>
      {footer && <AppFooter />}
    </div>
  );
}
