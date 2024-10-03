'use client';
import { ErrorFallback } from '@components';
import { MESSAGES } from '@enum';

const ErrorPage = (props: any) => {
  const { error } = props;
  return (
    <div className="container">
      <ErrorFallback
        buttonTitle="Back"
        showButton={false}
        description={MESSAGES.API_ISSUE}
        title="API Error"
        heading=""
        imageAlt={MESSAGES.API_ISSUE}
        backToHome={false}
        errorMessage={error?.digest}
      />
    </div>
  );
};

export default ErrorPage;
