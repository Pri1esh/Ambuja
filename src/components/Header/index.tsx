import { IHeader } from '@interfaces';
import { scrollFunction } from '@logic/header';
import { useDeviceType } from '@utils';
import cx from 'classnames';
import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from './NavBar';
import TopBar from './TopBar';
import styles from './header.module.scss';

const Header: FC<IHeader> = (props) => {
  const {
    compData,
    navCallback,
    isAbsolute = false,
    isStatic = false,
    waitForSticky = true,
    isHomePage = false,
    navBarType,
    defaultActive = '',
  } = props;

  const {
    addOnClass,
    logo,
    buLink,
    buLogoAltText = '',
    navData,
    topbarList,
    scrollOnAbsolute = false,
    stopHeaderAnimate = false,
    reference,
    isBordered,
    hamburgerMenuData = [],
    pageHeading,
  } = compData;
  const [pageName, setPageName] = useState<string>('');
  const { deviceType } = useDeviceType();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path =
        window.location.pathname.includes('/') &&
        window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).split('?')[0];
      setPageName(path || 'home');
    }
  }, []);

  useEffect(() => {
    const mainNav: any = document.getElementsByClassName(styles.mainNav)[0];
    const navPosition = mainNav.getBoundingClientRect().y + mainNav.offsetHeight;
    document.addEventListener('scroll', () => {
      scrollFunction(navPosition, styles.headerWrapper, styles.borderBottom, isAbsolute, waitForSticky, isStatic);
    });

    return () => {
      document.removeEventListener('scroll', () => {
        scrollFunction(
          mainNav.getBoundingClientRect.y + mainNav.offsetHeight,
          styles.headerWrapper,
          styles.borderBottom,
          isAbsolute,
          waitForSticky,
          isStatic,
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitForSticky, isAbsolute, scrollOnAbsolute]);

  function checkAbsolute() {
    if (isAbsolute) {
      return 'floatingHeader';
    } else if (isStatic) {
      return 'static';
    } else {
      return ` ${styles.noAnimate}  sticky`;
    }
  }

  return (
    <header className={`${isHomePage ? styles.headerContainerWithTopNav : styles.headerContainer}`}>
      <div
        className={`${styles.headerWrapper} ${checkAbsolute()}  ${cx({
          scrollOnAbsolute: scrollOnAbsolute,
          noAnimate: stopHeaderAnimate,
        })} ${addOnClass}`}
      >
        <Container fluid>
          {isHomePage && deviceType === 'desktop' && <TopBar topbarList={topbarList} />}
          <NavBar
            navData={navData}
            menuData={hamburgerMenuData}
            logo={logo}
            buLogoAltText={buLogoAltText}
            buLink={buLink}
            navCallback={navCallback}
            pageName={pageName}
            reference={reference}
            isBordered={isBordered}
            navBarType={navBarType}
            pageHeading={pageHeading}
            defaultActive={defaultActive}
          />
        </Container>
      </div>
    </header>
  );
};

export default Header;
