import { IMainNavDropdownMenu, INavDataItem } from '@interfaces';
import { GTMHelper, openLink } from '@utils';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomIcon from '../CustomIcon';
import styles from './header.module.scss';
const MainNavDropdownMenu = (props: IMainNavDropdownMenu) => {
  const { id, data, subMenu, setSubMenu } = props;

  const [totalLoop, setTotalLoop] = useState<number[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    if (data?.columnCount) {
      for (let index = 1; index <= data?.columnCount; index++) {
        setTotalLoop([...totalLoop, index]);
      }
    } else {
      setTotalLoop([1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dropdown.Menu key={id?.toString()} className={data?.isOpen ? '' : 'd-none'}>
      {totalLoop?.map((number: number, number_index: number) => (
        <div key={`${'total_loop_' + number_index}`} className={styles.menuContainer}>
          <div>
            {data?.items?.map((item: INavDataItem, itemIndex: number) => (
              <React.Fragment key={`idx_parent_${item.link + itemIndex}`}>
                <div
                  className={`${styles.itemNav} ${
                    subMenu?.length > 0 && itemIndex === activeMenu && styles.activeMenu
                  }`}
                >
                  <Dropdown.Item
                    href={item?.link}
                    itemProp="itemListElement"
                    onClick={(e) => {
                      openLink(item?.link, item?.linkTarget, e);
                      GTMHelper({ ...item?.gtmData });
                    }}
                    key={`idx_${item?.link}_${item?.link}___${item?.linkText + itemIndex}`}
                    onMouseEnter={() => {
                      if (item?.subMenu && item?.subMenu?.length > 0) {
                        setSubMenu(item?.subMenu);
                        setActiveMenu(itemIndex);
                      } else {
                        setSubMenu([]);
                        setActiveMenu(null);
                      }
                    }}
                  >
                    {item?.linkText}
                    {item?.subMenu && item?.subMenu?.length > 0 && (
                      <span>
                        <CustomIcon iconName="up" />
                      </span>
                    )}
                  </Dropdown.Item>
                </div>
              </React.Fragment>
            ))}
          </div>
          {subMenu?.length > 0 && (
            <ul className={styles.subMenu}>
              {subMenu?.map((item, index) => (
                <li key={`${index + item?.link}`}>
                  <a href={item?.link} target={item?.linkTarget}>
                    {item?.linkText}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </Dropdown.Menu>
  );
};

export default MainNavDropdownMenu;
