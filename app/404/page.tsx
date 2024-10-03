'use client';

import { ErrorFallback } from '@components';
import { MESSAGES } from '@enum';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PageNotFound = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/404') {
      router.replace('/404');
    }
  }, [router, pathname]);

  return (
    <div className="container">
      <ErrorFallback
        buttonTitle="Back"
        showButton={true}
        description={MESSAGES.PAGE_NOT_FOUND}
        title=""
        heading=""
        imageAlt={MESSAGES.PAGE_NOT_FOUND}
        backToHome={true}
      />
    </div>
  );
};

export default PageNotFound;
