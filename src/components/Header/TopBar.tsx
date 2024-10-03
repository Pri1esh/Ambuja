import { ITopBar, ITopBarList, ITopBarListItem } from '@interfaces';
import { getIconByName } from '@utils';
import React, { FC } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomLink from '../CustomLink';
import styles from './header.module.scss';

const TopBar: FC<ITopBar> = (props) => {
  const { topbarList, back = false } = props;

  return (
    <div className={back ? `${styles.topNav} d-flex justify-content-between` : styles.topNav}>
      {topbarList?.map((data: ITopBarList, index: number) => (
        <React.Fragment key={`${data?.linkText + index}`}>
          <CustomLink href={data?.phoneLink} className={styles.phoneNumber}>
            <span className={styles.iconBox}>{getIconByName(data?.phoneIcon)}</span> {data?.phone}
          </CustomLink>
          <Dropdown className={styles.navItem} key={`${data?.linkText + index}`}>
            {data?.items != null && data?.items.length > 0 ? (
              <>
                <Dropdown.Toggle
                  as="button"
                  className={`basicDropdown ${styles.businessHeader}`}
                  id={data?.linkText?.toString().replace(' ', '_').toLowerCase()}
                  key={`${data?.linkText + index}`}
                >
                  {getIconByName(data?.headerLeftIcon)} {data?.linkText}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {data?.items?.map((item: ITopBarListItem, itemIndex: number) => (
                    <Dropdown.Item
                      itemProp="itemListElement"
                      rel={item?.linkTarget == '_blank' ? 'noopener noreferrer' : ''}
                      key={`${item?.link + itemIndex}`}
                      href={item?.link}
                      target={item?.linkTarget && item?.linkTarget !== '' ? item?.linkTarget : undefined}
                    >
                      {getIconByName(item?.itemLeftIcon)}
                      {item?.linkText}
                      {item?.isActive && getIconByName('Tick')}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </>
            ) : (
              <Dropdown.Toggle
                itemProp="PotentialAction"
                variant="light"
                className="basicDropdown"
                id={data?.linkText?.toString().replace(' ', '_').toLowerCase()}
                key={`${data?.linkText + index}`}
                href={data.link}
              >
                {getIconByName(data?.headerLeftIcon)} {data?.linkText}
              </Dropdown.Toggle>
            )}
          </Dropdown>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TopBar;
