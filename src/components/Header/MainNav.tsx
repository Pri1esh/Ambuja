import { IHeaderNavData, IMainNav, INavDataItemSubMenu } from '@interfaces';
import { GTMHelper, openLink } from '@utils';
import React, { FC, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import EnquiryButton from './EnquiryButton';
import MainNavDropdownMenu from './MainNavDropdownMenu';
import styles from './header.module.scss';

const MainNav: FC<IMainNav> = (props) => {
  const { navData, defaultActive } = props;
  const [key, setKey] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState<INavDataItemSubMenu[]>([]);
  const onChildShown = (linkText: string) => {
    navData?.map((data: IHeaderNavData, index: number) => {
      navData[index] = { ...data, isOpen: data.linkText === linkText };
    });
    setKey(!key);
  };

  return (
    <div className={styles.headerNav}>
      <div className={styles.navbarNav}>
        <div className={styles.navbarMenu}>
          {navData?.map((data: IHeaderNavData, index: number) => {
            return data?.headerCallback ? (
              <EnquiryButton key={`navbar-nav__${data?.linkText + index}`} data={data} />
            ) : (
              <React.Fragment key={`navbar-nav__${data?.linkText + index}`}>
                <Dropdown
                  itemScope
                  itemType="https://schema.org/ItemList"
                  className={`${styles.navItem} ${defaultActive === data?.activeId ? styles.activeNav : ''}`}
                  key={`nav_item _${data?.linkText + index}`}
                  onMouseEnter={() => {
                    onChildShown(data?.linkText);
                    setSubMenu([]);
                  }}
                  onMouseLeave={() => {
                    navData?.map((data: IHeaderNavData, index: number) => {
                      navData[index] = { ...data, isOpen: false };
                    });
                    setKey(!key);
                  }}
                  show={true}
                >
                  <Dropdown.Toggle
                    itemProp="potentialAction"
                    variant="light"
                    as="a"
                    className="basicDropdown"
                    data-defaultimg={data?.defaultImage}
                    id={data?.linkText?.toString().replace(' ', '_').toLowerCase() + 'toggle'}
                    onClick={(e) => {
                      data?.link && data?.link !== '#' && openLink(data?.link, data?.linkTarget ?? '', e);
                      GTMHelper({ ...data?.gtmData });
                    }}
                    href={!data?.headerCallback && data?.link ? data?.link : '#'}
                  >
                    {data.linkText}
                  </Dropdown.Toggle>
                  {data?.items && data?.items?.length > 0 && (
                    <MainNavDropdownMenu data={data} id={key} setSubMenu={setSubMenu} subMenu={subMenu} />
                  )}
                </Dropdown>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
