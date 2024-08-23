import { CustomImage, CustomLink } from '@components';
import { IHomeCategoryList, IHomeCategoryListDetail } from '@interfaces';
import { GTMHelper } from '@utils';
import { useRef } from 'react';
import styles from './homeCategoryList.module.scss';

const HomeCategoryList = (props: IHomeCategoryList) => {
  const { categoryData, type = '', isCategoryPage = false } = props;
  const myref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`container ${styles.wrapper} ${type === 'category' ? styles.categoryContainer : ''}`}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className={styles.row} ref={myref}>
        {categoryData?.map((data: IHomeCategoryListDetail, key: number) => (
          <button
            itemProp="itemListElement"
            key={`${data?.link + key}`}
            className={styles.col}
            onClick={() => {
              if (isCategoryPage) {
                sessionStorage.setItem('isScroll', 'true');
              }
            }}
          >
            <div itemProp="itemListElement" className={styles.card} key={`${data?.link + key}`}>
              <CustomLink
                variant={'anchor'}
                href={data?.link}
                target={data?.linkTarget}
                onClick={() => {
                  GTMHelper({
                    ...data?.gtmData,
                  });
                }}
              >
                <div
                  itemProp="itemListElement"
                  className={`${styles.cardThumb} ${data?.isActive ? styles.enableBorder : ''}`}
                >
                  <CustomImage
                    itemProp="image"
                    src={{
                      defaultSource: data?.imageSource,
                      tabletSource: data?.imageSourceTablet,
                      mobileSource: data?.imageSourceMobile,
                    }}
                    alt={data?.imageAlt ?? data?.productName}
                    layout="responsive"
                  />
                </div>
                <div className={styles.cardDescription}>
                  {data?.productName && <h2 itemProp="name">{data?.productName}</h2>}
                </div>
              </CustomLink>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryList;
