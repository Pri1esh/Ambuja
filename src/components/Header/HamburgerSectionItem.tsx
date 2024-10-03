import { IHamburgerSectionItem, IHeaderSectionItem } from '@interfaces';
import { getIconByName, GTMHelper, openLink, timeout } from '@utils';
import cx from 'classnames';
import React from 'react';
import CustomLink from '../CustomLink';
import CollapsePanel from './CollapsePanel';
import styles from './header.module.scss';

const HamburgerSectionItem = (props: IHamburgerSectionItem) => {
  const { data, pageName, onCollapseClicked } = props;

  return (
    <div className={styles.hamburgerSection}>
      <h5>{data?.sectionHeader}</h5>
      <ul>
        {data?.sectionItems?.map((sectionItem: IHeaderSectionItem, sectionIndex: number) => (
          <React.Fragment key={`${sectionItem?.linkText + sectionIndex}`}>
            {(!sectionItem?.collapseItems ||
              (sectionItem?.collapseItems && sectionItem?.collapseItems?.length === 0)) && (
              <li
                itemProp="itemListElement"
                className={sectionItem?.link?.toLowerCase().includes('tel') ? styles.calling : ''}
              >
                <CustomLink
                  className={cx(styles.menuItem, styles.ripple)}
                  href={sectionItem?.link}
                  target={sectionItem?.linkTarget}
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    timeout(function () {
                      openLink(sectionItem?.link, sectionItem?.linkTarget, e);
                    }, 500);
                    GTMHelper({ ...sectionItem?.gtmData });
                  }}
                >
                  <span className={styles.iconBox}>{getIconByName(sectionItem?.itemLeftIcon)}</span>
                  {sectionItem?.linkText}
                  {sectionItem?.highlightLabel && (
                    <span className={styles.highlightText}>{sectionItem?.highlightLabel}</span>
                  )}
                </CustomLink>
              </li>
            )}
            {sectionItem?.collapseItems && sectionItem?.collapseItems?.length > 0 && (
              <li itemProp="url">
                <CollapsePanel
                  pageName={pageName}
                  sectionItem={sectionItem}
                  onCollapseClick={() => {
                    onCollapseClicked(data?.sectionHeader, sectionItem.linkText, sectionItem?.isOpen);
                  }}
                />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerSectionItem;
