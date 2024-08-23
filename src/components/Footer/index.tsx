import { IFooter } from '@interfaces';
import { getIconByName, GTMHelper, openLink, useDeviceType, useRipple } from '@utils';
import React, { FC, useState } from 'react';
import BottomLinks from '../BottomLinks';
import CustomImage from '../CustomImage';
import FooterBg from '../FooterBg';
import styles from './footer.module.scss';

const Footer: FC<IFooter> = (props) => {
  const { compData, isHomePage } = props;
  const {
    mainNavigations,
    socialLinks,
    copyRight,
    buCopyright = '',
    largeFooter = true,
    logo,
    backgroundImage,
    bottomLinks,
  } = compData;

  const [isActive, setIsActive] = useState(-1);

  const { createRippleParam } = useRipple();
  const { deviceType } = useDeviceType();
  const lastItem = mainNavigations?.length - 1;

  const toggleClass = (key: number) => {
    if (key === isActive) {
      setIsActive(-1);
    } else {
      setIsActive(key);
    }
  };

  return (
    <div className={styles.footer}>
      <footer className={`footer_wrapper ${styles.footerWrapper} `} itemScope itemType="https://schema.org/WPFooter">
        {backgroundImage && isHomePage && <FooterBg compData={backgroundImage} />}
        {bottomLinks && <BottomLinks bottomLinksData={bottomLinks} />}
        <div className={styles.footerNavWrapper}>
          <div itemScope itemType="http://schema.org/SiteNavigationElement" className="container">
            {largeFooter && (
              <ul itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList" className={styles.footerNav}>
                {mainNavigations?.map((navigation: any, index: number) => {
                  return (
                    <React.Fragment key={`main_navigation_parent_${navigation?.heading + index}`}>
                      <li itemProp="itemListElement" className={styles.footerNavGrid}>
                        <button
                          itemProp="name"
                          className={`${styles.footerLinkHeading} ${
                            isActive == index && deviceType !== 'desktop' ? styles.active : ''
                          }`}
                          onClick={(e) => {
                            if (deviceType !== 'desktop') createRippleParam(e, 'primary_waves');
                            toggleClass(index);
                          }}
                        >
                          {navigation?.heading}
                          {getIconByName('arrowdown')}
                        </button>
                        <ul
                          itemProp="itemListElement"
                          itemScope
                          itemType="https://schema.org/ItemList"
                          className={`${styles.footerLinkList} ${
                            isActive == index && deviceType !== 'desktop' ? 'active' : ''
                          }`}
                        >
                          {navigation?.items?.map((navItems: any, idx: number) => {
                            return (
                              <React.Fragment key={`main_navigation_parent_nav_item${navItems?.link + idx}`}>
                                <li itemProp="itemListElement" className={styles.footerLink}>
                                  <a
                                    className={styles.footerLinkItem}
                                    rel="noreferrer noopener"
                                    itemProp="url"
                                    target={navItems?.linkTarget}
                                    href={navItems?.link}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      GTMHelper({
                                        ...navItems?.gtmData,
                                      });
                                      openLink(navItems?.link, navItems?.linkTarget, e);
                                    }}
                                  >
                                    {navItems?.linkText}
                                  </a>
                                </li>
                              </React.Fragment>
                            );
                          })}

                          {lastItem === index && deviceType == 'desktop' && (
                            <li>
                              <CustomImage
                                className={styles.logo}
                                src={{
                                  defaultSource: logo?.imageSource,
                                }}
                                alt=""
                                lazy="false"
                                loader="false"
                              />
                            </li>
                          )}
                        </ul>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            )}

            {largeFooter && (
              <div className={styles.socialLinkWrapper}>
                <ul
                  className={styles.socialLinkList}
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/ItemList"
                >
                  {socialLinks &&
                    socialLinks?.length > 0 &&
                    socialLinks[0]?.items?.map((item: any, idx: number) => {
                      return (
                        <li itemProp="itemListElement" key={`footer_link_social_link_${item?.link + idx}`}>
                          <a
                            itemProp="url"
                            rel="noreferrer noopener"
                            href={item?.link}
                            target={item?.linkTarget}
                            aria-label="social-link"
                            onClick={(e: any) => {
                              e.preventDefault();
                              openLink(item?.link, item?.linkTarget, e);
                              GTMHelper({
                                ...item?.gtmData,
                              });
                            }}
                          >
                            {getIconByName(item?.itemicon)}
                          </a>
                        </li>
                      );
                    })}
                </ul>
                <div className={styles.footerCopyright}>
                  <ul
                    className={styles.copyrightLinksList}
                    itemProp="mainEntity"
                    itemScope
                    itemType="https://schema.org/ItemList"
                  >
                    <li itemProp="itemListElement">
                      &copy;
                      {` ${buCopyright}`}
                    </li>

                    {copyRight &&
                      copyRight?.length > 0 &&
                      copyRight[0]?.items?.map((item: any, idx: number) => {
                        return (
                          <li
                            itemProp="itemListElement"
                            key={`footer_link_copyright_${item?.link + idx}`}
                            data-auto-id={item?.autoId}
                          >
                            <a
                              itemProp="url"
                              href={item?.link}
                              target={item?.linkTarget && item?.linkTarget !== '' ? item?.linkTarget : null}
                            >
                              {item?.linkText}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
