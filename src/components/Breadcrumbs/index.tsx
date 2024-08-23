import { IBreadcrumbs } from '@interfaces';
import { useDeviceType } from '@utils';
import { FC } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';
import styles from './breadcrumb.module.scss';

const Breadcrumbs: FC<IBreadcrumbs> = ({
  list = [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onItemClick = () => {},
  className = '',
  itemProps,
  showOnMobile = false,
  theme,
}) => {
  const { deviceType } = useDeviceType();
  return (
    <>
      {deviceType === 'desktop' || showOnMobile ? (
        <Breadcrumb
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className={`${styles.breadcrumb} ${className} ${theme === 'light' && styles.lightTheme}`}
          auto-id="data_breadcrumb"
        >
          {list.map((item: any, index: number) => (
            <BreadcrumbItem
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              key={`${item?.link + index}`}
              active={item?.active}
              href={item?.link}
              onClick={() => onItemClick(item)}
              linkProps={{ itemProp: 'item', ...item?.linkProps }}
              {...itemProps}
            >
              <span itemProp="name">{item?.linkText}</span>
              <meta itemProp="position" content={`${index + 1}`} />
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      ) : (
        <></>
      )}
    </>
  );
};

export default Breadcrumbs;
