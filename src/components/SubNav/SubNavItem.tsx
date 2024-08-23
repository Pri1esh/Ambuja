import { ISubNav } from '@interfaces';
import { GTMHelper, getIconByName, scrollTabIntoView, useDeviceType } from '@utils';
import { useEffect, useRef } from 'react';
import CustomLink from '../CustomLink';
import styles from './subNav.module.scss';

const SubNavItem = (props: ISubNav) => {
  const { compData, offcanvasHeading, isMobileDropdown = false, classname } = props;
  const parentRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    setTimeout(() => scrollTabIntoView(parentRef?.current, activeTabRef?.current), 100);
  }, []);

  return (
    <div className={`${classname ?? styles.navWrapper}`}>
      <h2 className={styles.heading}>{offcanvasHeading}</h2>
      <div className={styles.pageNavWrapper}>
        <ul className={styles.pageNav} ref={parentRef}>
          {compData?.map((item, index) => (
            <li
              key={`${item?.linkText + index}`}
              className={`${styles.pageNavItem} ${item?.active ? styles.selected : ''}`}
              ref={item?.active ? activeTabRef : null}
            >
              <CustomLink
                href={item?.link}
                target={item?.linkTarget}
                className={item?.active ? styles.activeNavItem : ''}
                onClick={() => {
                  GTMHelper({ ...item?.gtmData });
                }}
              >
                {item?.linkText}
              </CustomLink>
              {deviceType !== 'desktop' &&
                deviceType !== 'tablet' &&
                item?.active &&
                isMobileDropdown &&
                getIconByName('tick')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubNavItem;
