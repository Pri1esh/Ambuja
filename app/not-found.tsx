import { ErrorFallback } from '@components';
import { MESSAGES } from '@enum';

const NotFoundPage = () => {
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

export default NotFoundPage;
