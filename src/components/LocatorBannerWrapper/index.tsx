import { CustomToast, LocatorBanner } from '@components';
import { ILocatorBannerWrapper } from '@interfaces';
import { useState } from 'react';

const LocatorBannerWrapper = (props: ILocatorBannerWrapper) => {
  const { compData, dealerLocatorData, breadCrumbList } = props;

  const [showToast, setShowToast] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  return (
    <>
      {showToast && <CustomToast show={showToast} message={toastMessage || ''} setShow={setShowToast} />}
      <LocatorBanner
        compData={compData}
        dealerLocatorData={dealerLocatorData}
        setShowToast={setShowToast}
        setToastMessage={setToastMessage}
        breadCrumbList={breadCrumbList}
      />
    </>
  );
};

export default LocatorBannerWrapper;
