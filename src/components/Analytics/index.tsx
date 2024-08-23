'use client';

import { useEffect } from 'react';
import useGTM from 'src/lib/utils/useGTM';

const Analytics = () => {
  const { loadScript } = useGTM();

  useEffect(() => {
    loadScript(process.env.NEXT_PUBLIC_GTM_ID);
  });

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};

export default Analytics;
