import { INavBar } from '@interfaces';
import { getIconByName, useDeviceType } from '@utils';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import EnquiryButton from './EnquiryButton';
import Logo from './Logo';
import MainNav from './MainNav';
import NavBrand from './NavBrand';
import styles from './header.module.scss';
const NavBar: FC<INavBar> = (props) => {
  const { deviceType } = useDeviceType();
  const router = useRouter();
  const {
    navData,
    menuData,
    logo,
    buLink,
    buLogoAltText,
    navCallback,
    pageName,
    reference,
    isBordered,
    pageHeading,
    navBarType,
    defaultActive,
  } = props;
  const headerData = navData[navData?.length - 1];
  const getSectionFromType = (data: any) => {
    switch (data) {
      case 'productDetail':
        return productDetail();
      case 'productPages':
        return productPages();
      default:
        return defaultNavBrand();
    }
  };
  const productDetail = () => {
    return (
      <>
        <div className={styles.brand}>
          <div className={styles.backHeader}>
            <button aria-label="back" onClick={() => router.back()}>
              {getIconByName('arrowleft')}
            </button>
            <Logo logo={logo} buLink={buLink} buLogoAltText={buLogoAltText} />
          </div>
        </div>
        <EnquiryButton data={headerData} />
      </>
    );
  };
  const productPages = () => {
    return (
      <>
        <div className={styles.brand}>
          <div className={styles.backHeader}>
            <button aria-label="back" onClick={() => router.back()}>
              {getIconByName('arrowleft')}
            </button>
            {pageHeading && <span className={styles.pageHeading}>{pageHeading}</span>}
          </div>
        </div>
        <EnquiryButton data={headerData} />
      </>
    );
  };
  const defaultNavBrand = () => {
    return (
      <>
        <NavBrand
          menuData={menuData}
          logo={logo}
          buLogoAltText={buLogoAltText}
          buLink={buLink}
          pageName={pageName}
          reference={reference}
          isBordered={isBordered}
        />
        {deviceType === 'desktop' ? (
          <MainNav defaultActive={defaultActive} navData={navData} navCallback={navCallback} pageName={pageName} />
        ) : (
          <EnquiryButton data={headerData} />
        )}
      </>
    );
  };

  return (
    <nav className={cx('navbar', styles.mainNav)}>
      {deviceType !== 'desktop' ? getSectionFromType(navBarType) : defaultNavBrand()}
    </nav>
  );
};
export default NavBar;
