import { INavBrand } from '@interfaces';
import { getIconByName } from '@utils';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Button } from '../Forms/Fields';
import Hamburger from './Hamburger';
import Logo from './Logo';
import styles from './header.module.scss';

const NavBrand = (props: INavBrand) => {
  const { menuData, logo, buLink, buLogoAltText, pageName } = props;

  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(true);
  }, []);

  const handleShow = () => {
    setShow(true);
    document.body.classList.add('menu-show');
  };

  const handleClose = () => {
    setShow(false);
    document.body.classList.remove('menu-show');
  };

  return (
    <div className={styles.brand}>
      {menuData && menuData?.length > 0 && (
        <div className={styles.hamburgerMenu}>
          <Button
            ariaLabel="hamburger"
            onClick={() => {
              handleShow();
            }}
          >
            {getIconByName('hamburger')}
          </Button>
        </div>
      )}

      {menu && (
        <Offcanvas show={show} onHide={handleClose} placement="start" className="menuOffcanvas">
          {menuData && menuData?.length > 0 && (
            <Hamburger
              menuData={menuData}
              logo={logo}
              buLink={buLink}
              buLogoAltText={buLogoAltText}
              pageName={pageName}
            />
          )}
        </Offcanvas>
      )}

      {!menu && (
        <>
          <div className={`menuOffcanvas d-none ${styles.menu} ${show ? styles.show : ''}`}>
            <Hamburger
              menuData={menuData}
              logo={logo}
              buLink={buLink}
              buLogoAltText={buLogoAltText}
              pageName={pageName}
            />
          </div>
          {show && <button className="fade modal-backdrop show d-none" onClick={handleClose}></button>}
        </>
      )}

      <Logo logo={logo} buLink={buLink} buLogoAltText={buLogoAltText} />
    </div>
  );
};

export default NavBrand;
