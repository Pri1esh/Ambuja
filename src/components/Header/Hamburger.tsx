import { IHamburger, IHeaderWrapperMenu } from '@interfaces';
import { WrapperMenu, handleCollapsedClick, handleCollapsedParentClick } from '@logic/header';
import React, { useState } from 'react';
import HamburgerCollapse from './HamburgerCollapse';
import HamburgerSectionItem from './HamburgerSectionItem';
import Logo from './Logo';
import styles from './header.module.scss';

const Hamburger = (props: IHamburger) => {
  const { menuData, pageName = '', logo, buLink, buLogoAltText, linkTarget } = props;
  const [allMenuData, setAllMenuData] = useState<IHeaderWrapperMenu[]>(WrapperMenu([...menuData]));

  const onCollapseClicked = (sectionHeader: string, linkText: string, isOpen: boolean) => {
    handleCollapsedClick(sectionHeader, linkText, isOpen, allMenuData, setAllMenuData);
  };

  const onCollapseParentClicked = async (linkText: string, isOpen: boolean) => {
    handleCollapsedParentClick(linkText, isOpen, allMenuData, setAllMenuData);
  };

  return (
    <div className={styles.hamburger}>
      <div className={styles.hamburgerLinks}>
        {allMenuData?.map((data: IHeaderWrapperMenu, index: number) => (
          <React.Fragment key={`${data.sectionHeader + index}`}>
            {data?.collapseItems && data?.collapseItems?.length > 0 ? (
              <HamburgerCollapse data={data} pageName={pageName} onCollapseParentClicked={onCollapseParentClicked} />
            ) : (
              data?.sectionItems &&
              data?.sectionItems.length > 0 && (
                <HamburgerSectionItem data={data} pageName={pageName} onCollapseClicked={onCollapseClicked} />
              )
            )}
          </React.Fragment>
        ))}
      </div>
      <footer>
        <Logo logo={logo} buLink={buLink} buLogoAltText={buLogoAltText} linkTarget={linkTarget} />
      </footer>
    </div>
  );
};

export default Hamburger;
