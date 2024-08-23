import { Analytics, AppWrapper } from '@components';
import React, { Suspense } from 'react';
import packageJSON from '../package.json';
import '../styles/styles.scss';
export const dynamic = 'force-dynamic';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const appTime = new Date();
  const getTime = (d: Date) => {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.toString().substring(16, 24);
  };

  return (
    <html lang="en">
      <head>
        <meta name="msvalidate_01" content="2B0C34807FA5B7ACA277D5A725CDE76D" />
      </head>
      <body
        data-at={getTime(appTime)}
        data-st={getTime(new Date())}
        data-version={packageJSON?.version}
        data-aks-tag={process.env.AKS_TAG}
      >
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
