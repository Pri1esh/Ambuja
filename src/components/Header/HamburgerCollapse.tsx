import { IHamburgerCollapse } from '@interfaces';
import cx from 'classnames';
import React from 'react';
import CollapsePanel from './CollapsePanel';
import styles from './header.module.scss';

const HamburgerCollapse = (props: IHamburgerCollapse) => {
  const { data, onCollapseParentClicked, pageName } = props;

  return (
    <div className={cx(styles.hamburgerSection, styles.singleItem)}>
      <CollapsePanel
        pageName={pageName}
        sectionItem={{
          linkText: data?.sectionHeader,
          isOpen: false,
          itemLeftIcon: data?.sectionLeftIcon,
          ...data,
        }}
        onCollapseClick={() => {
          onCollapseParentClicked(data?.sectionHeader, data?.isOpen || false);
        }}
      />
    </div>
  );
};

export default HamburgerCollapse;
