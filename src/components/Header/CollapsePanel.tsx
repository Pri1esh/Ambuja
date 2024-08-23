import { ICollapsePanel, IGTMData, IHeaderCollapseItem, IHelpDropdownItem } from '@interfaces';
import { handleCollapseLinkClick, handleDropdownOpen } from '@logic/header';
import { GTMHelper, getIconByName } from '@utils';
import cx from 'classnames';
import React, { FC, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import CustomLink from '../CustomLink';
import styles from './header.module.scss';

const CollapsePanel: FC<ICollapsePanel> = ({ sectionItem, onCollapseClick }) => {
  const [openChild, setOpenChild] = useState('');

  const handleChildOpen = (val: string) => {
    handleDropdownOpen(val, openChild, setOpenChild);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: IHeaderCollapseItem | IHelpDropdownItem,
    gtmData?: IGTMData,
  ) => {
    handleCollapseLinkClick(e, item, handleChildOpen, gtmData);
  };

  return (
    <>
      {sectionItem?.collapseItems && (
        <>
          <button
            className={cx(styles.menuItem, styles.ripple)}
            onClick={() => {
              onCollapseClick();
              setOpenChild('');
              GTMHelper({ ...sectionItem?.gtmData });
            }}
            aria-controls={sectionItem?.linkText.toLowerCase().split(' ').join('_')}
            aria-expanded={!!sectionItem?.isOpen}
          >
            <span className={styles.iconBox}>{getIconByName(sectionItem?.itemLeftIcon)}</span>
            <label> {sectionItem?.linkText}</label>
            <span className={styles.icon}>{getIconByName('arrowdown')}</span>
          </button>
          <Collapse in={sectionItem?.isOpen}>
            <ul className={styles.subMenu} id={sectionItem?.linkText.toLowerCase().split(' ').join('_')}>
              {sectionItem?.collapseItems.map((collapseItem: IHelpDropdownItem, collapseIndex: number) => {
                const isSelected = collapseItem?.isActive;
                return (
                  <React.Fragment key={`${collapseItem?.linkText + collapseIndex}`}>
                    <li itemProp="itemListElement">
                      {collapseItem?.collapseItems ? (
                        <button
                          className={`${styles.menuItem} ${isSelected ? 'active' : ''}`}
                          onClick={(e: any) => {
                            handleLinkClick(e, collapseItem, sectionItem?.gtmData);
                          }}
                          aria-controls={collapseItem?.linkText.toLowerCase().split(' ').join('_')}
                          aria-expanded={openChild === collapseItem?.linkText}
                        >
                          <span className={styles.iconBox}>{getIconByName(collapseItem?.itemLeftIcon)}</span>
                          <label itemProp="name">{collapseItem?.linkText}</label>
                          {collapseItem?.collapseItems && collapseItem?.collapseItems.length > 0 && (
                            <button className={styles.icon} onClick={() => handleChildOpen(collapseItem?.linkText)}>
                              {getIconByName('arrowdown')}
                            </button>
                          )}
                          {isSelected && <span className={styles.tick}>{getIconByName('Tick')}</span>}
                        </button>
                      ) : (
                        <CustomLink
                          // rel={collapseItem?.linkTarget == '_blank' ? 'noopener noreferrer' : ''}
                          target={collapseItem?.linkTarget}
                          className={cx(styles.menuItem, styles.ripple, isSelected ? 'active' : '')}
                          href={collapseItem.link}
                          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            handleLinkClick(e, collapseItem, sectionItem?.gtmData);
                          }}
                          aria-controls={collapseItem?.linkText.toLowerCase().split(' ').join('_')}
                          aria-expanded={openChild === collapseItem?.linkText}
                        >
                          {sectionItem?.linkText.includes('Adani Businesses') && (
                            <span className={styles.iconBox}>{getIconByName(collapseItem?.itemLeftIcon)}</span>
                          )}
                          <label
                            className={
                              collapseItem?.linkText?.toLowerCase()?.includes('view all') ? styles.viewAll : ''
                            }
                          >
                            {collapseItem?.linkText}
                          </label>
                          {collapseItem?.collapseItems && collapseItem?.collapseItems.length > 0 && (
                            <button className={styles.icon} onClick={() => handleChildOpen(collapseItem?.linkText)}>
                              {getIconByName('arrowdown')}
                            </button>
                          )}
                          {isSelected && <span className={styles.tick}>{getIconByName('Tick')}</span>}
                        </CustomLink>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </Collapse>
        </>
      )}
    </>
  );
};

export default CollapsePanel;
