import { CustomLink, Footer, GetInTouchForm } from '@components';
import { IMoreNavItem, IStickyMobileMenu, IStickyNavTab } from '@interfaces';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import CustomIcon from '../CustomIcon';
import Products from './Products';
import styles from './stickyMobileMenu.module.scss';

const NavData = (props: IStickyMobileMenu) => {
  const { compData } = props;
  const { footerData, stickyNavData } = compData;
  const { navData } = stickyNavData;

  return (
    <div className={styles.navDataWrapper}>
      <div className={styles.navData}>
        <div className={styles.primary}>
          <CustomIcon iconName={navData?.headingIcon} />
          <div>
            <label>{navData?.heading}</label>
            <p>{navData?.description}</p>
          </div>
        </div>
        <div className={styles.secondary}>
          <p className={styles.heading}>{navData?.otherData?.heading}</p>
          <ul>
            {navData?.otherData?.items?.map((item: IMoreNavItem, index: number) => (
              <li key={`${item?.label + index}`}>
                <CustomLink href={item?.link} target={item?.linkTarget}>
                  <CustomIcon iconName={item?.iconName} />
                  {item?.label}
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer compData={footerData} />
    </div>
  );
};

const StickyMobileMenu = (props: IStickyMobileMenu) => {
  const { defaultActive = '', compData } = props;

  const [activeTab, setActiveTab] = useState('');
  const [show, setShow] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');
  const [openPage, setOpenPage] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const handleScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
    setShowHeader(document.body.getBoundingClientRect().top > scrollPos);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  useEffect(() => {
    handleClick({ activeId: defaultActive }, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActive]);

  const handleClick = (item: any, e: any) => {
    if (item?.isOffcanvas) {
      e?.preventDefault();
      activeTab === item?.activeId && show === true ? setShow(false) : setShow(true);
    } else {
      setOpenPage(item?.activeId);
    }
    setLabel(item?.label);
    setActiveTab(item?.activeId);
  };

  return (
    <div className={styles.stickyMenuWrapper}>
      <div className={`${styles.stickymenu} ${showHeader ? styles.menuvisible : styles.menuhidden}`}>
        <ul>
          {compData?.stickyNavData?.tabs?.map((item: IStickyNavTab, index: number) => (
            <li key={`${item?.link + index}`}>
              <CustomLink
                href={item?.link}
                onClick={(e: any) => {
                  handleClick(item, e);
                }}
                className={`${activeTab === item?.activeId ? styles.active : styles.inactive}`}
              >
                <span>
                  <CustomIcon iconName={item?.icon} />
                </span>
                {item?.label}
              </CustomLink>
            </li>
          ))}
        </ul>

        {activeTab === 'enquiry' ? (
          <GetInTouchForm isPopup={true} setShow={setShow} show={show} />
        ) : (
          <Offcanvas
            className={styles.offCanvas}
            placement={'bottom'}
            show={show}
            onHide={() => {
              setShow(false);
            }}
          >
            <Offcanvas.Header className={styles.offcanvasHeader}>
              <Offcanvas.Title
                className="mb-2"
                onClick={() => {
                  setShow(false);
                  setActiveTab(openPage);
                }}
              >
                <CustomIcon iconName={'close'} />
              </Offcanvas.Title>
              {label}
            </Offcanvas.Header>
            <Offcanvas.Body>
              {activeTab === 'products' ? (
                <Products compData={compData?.stickyNavData?.products} />
              ) : (
                <NavData compData={compData} />
              )}
            </Offcanvas.Body>
          </Offcanvas>
        )}
      </div>
    </div>
  );
};

export default StickyMobileMenu;
