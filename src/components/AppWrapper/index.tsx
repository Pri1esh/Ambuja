'use client';

import { AppInsightsContextProvider } from '@context';
import { SSRProvider } from 'react-bootstrap';

function AppWrapper(props: any) {
  const { children } = props;

  return (
    <SSRProvider>
      <AppInsightsContextProvider>{children}</AppInsightsContextProvider>
    </SSRProvider>
  );
}

export default AppWrapper;
