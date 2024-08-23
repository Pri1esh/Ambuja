import { CustomToast, DealerLocator } from '@components';
import { useState } from 'react';

const DealerWrapper = (props: any) => {
  const { compData, inPage, showOffcanvas, setShowOffcanvas } = props;

  const [showToast, setShowToast] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  return (
    <>
      {showToast && <CustomToast show={showToast} message={toastMessage || ''} setShow={setShowToast} />}
      <DealerLocator
        compData={compData}
        setShowToast={setShowToast}
        setToastMessage={setToastMessage}
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={setShowOffcanvas}
        inPage={inPage}
      />
    </>
  );
};

export default DealerWrapper;
