import { ISubNav } from '@interfaces';
import { CustomImage } from '@components';
import { scrollTabIntoView } from '@utils';
import { useEffect, useRef } from 'react';
import CustomLink from '../CustomLink';
import styles from './sideNav.module.scss';
import Image from 'next/image';
import rightarrow from '../../assets/icons/arrowrighttail.svg';

const SubNavItem = (props: ISubNav) => {
  const { compData, offcanvasHeading = false, classname } = props;
  const parentRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setTimeout(() => scrollTabIntoView(parentRef?.current, activeTabRef?.current), 100);
  }, []);

  return (
    <div className={`${classname ?? styles.navWrapper}`}>
      <h2 className={styles.heading}>{offcanvasHeading}</h2>
      {compData && (
        <ul className={styles.hbgMenu}>
          {compData.map((item: any, index) => (
            <li key={index}>
              <CustomLink href={item?.link} target={item?.linkTarget}>
                <div className={styles.menuTab}>
                  <div className="d-flex align-items-center">
                    <CustomImage
                      lazy="false"
                      src={{
                        mobileSource: item?.iconSource,
                        tabletSource: item?.iconSource,
                        defaultSource: item?.iconSource,
                      }}
                      loader="false"
                      alt="->"
                    />
                    <p className="">{item.linkText}</p>
                  </div>
                  {item.active && <Image src={rightarrow} alt="->" />}
                </div>
              </CustomLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubNavItem;
