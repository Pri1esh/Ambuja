import { IAppCookie } from '@interfaces';
import { useDeviceType } from '@utils';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import CustomIcon from '../CustomIcon';
import Button from '../Forms/Fields/Button';
import styles from './cookies.module.scss';

const AppCookie = (props: { compData: IAppCookie }) => {
  const { deviceType } = useDeviceType();
  const { compData } = props;
  const [showDecline, setShowDecline] = useState<boolean>(true);
  const [cookieDelay, setCookieDelay] = useState(false);

  const getCookie = (name: string) => {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  };

  const cookieHandler = () => {
    const setCookie = (name: string) => {
      document.cookie = name + '=accepted; path=/';
    };
    setCookie('ambujaPrivacyCookie');
    setShowDecline(false);
  };

  useEffect(() => {
    setTimeout(() => setCookieDelay(true), 2000);
    const hasCookie = getCookie('ambujaPrivacyCookie');
    if (hasCookie && hasCookie.length > 0) {
      setShowDecline(false);
    }
  }, []);
  const cookieData = () => {
    return (
      <>
        <div className={styles.closeIcon}>
          <button className={styles.closeBtn} onClick={() => setShowDecline(false)} aria-label="cookie-popup">
            <CustomIcon iconName={'close'} />
          </button>
        </div>
        <label>{compData?.heading}</label>
        <div className={styles.cookiesContent}>
          <p>{compData?.description}</p>
          <div>
            <Button className={styles.acceptCookies} variant="primary" onClick={() => cookieHandler()}>
              {compData?.acceptCookies}
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showDecline && cookieDelay && (
        <>
          {deviceType === 'tabletVertical' || deviceType === 'mobile' ? (
            <Offcanvas className={styles.offCanvas} show={true} placement="bottom" closeButton={true}>
              {cookieData()}
            </Offcanvas>
          ) : (
            <div className={styles.cookiesLayer}>{cookieData()}</div>
          )}
        </>
      )}
    </>
  );
};

export default AppCookie;
