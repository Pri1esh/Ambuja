"use client"

import { ISubNav } from '@interfaces';
import { getIconByName, useDeviceType } from '@utils';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import SubNavItem from './SubNavItem';
import MobileSubNavItem from './MobileSubNavItem';
import styles from './sideNav.module.scss';

const SideNav = (props: ISubNav) => {
  const { compData, heading, offcanvasHeading, isMobileDropdown = false } = props;
  const { deviceType } = useDeviceType();
  const [showNav, setShowNav] = useState(false);

  const handleToggleMenu = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      {isMobileDropdown && deviceType !== 'desktop' && deviceType !== 'tablet' ? (
        <div className="container">
          <button className={styles.pageHeading} onClick={handleToggleMenu}>
            {heading}
            <span className={`${styles.downArrow} ${showNav ? styles.active : ''}`}>{getIconByName('arrowdown')}</span>
          </button>

          <Offcanvas className={styles.offCanvas} placement={'bottom'} show={showNav} onHide={() => setShowNav(false)}>
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className={styles.offcanvasBody}>
              <MobileSubNavItem
                compData={compData}
                isMobileDropdown={isMobileDropdown}
                offcanvasHeading={offcanvasHeading}
                classname={styles.mobileWrapper}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <SubNavItem compData={compData} isMobileDropdown={isMobileDropdown} offcanvasHeading={offcanvasHeading} />
      )}
    </>
  );
};

export default SideNav;
