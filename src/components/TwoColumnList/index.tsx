'use client';
import { CustomImage, CustomLink } from '@components';
import { ITwoColumnList, ITwoColumnListItem } from '@interfaces';
import { GTMHelper } from '@utils';
import Description from './description';
import styles from './twoColumnList.module.scss';

const TwoColumnList = (props: ITwoColumnList) => {
  const { compData, extraMargin = true } = props;

  return (
    <div className={`${styles.wrapper} ${extraMargin && styles.extraMargin}`}>
      {compData?.heading && <h2 className={styles.listHeading}>{compData?.heading}</h2>}
      <div className={styles.listWrapper}>
        {compData?.list?.map((item: ITwoColumnListItem, index: number) => (
          <div className={styles.item} key={`${item?.heading + index}`}>
            <div className={styles.iconContainer}>
              <CustomImage src={{ defaultSource: item?.iconImage }} alt="" loader="false" />
            </div>
            <div className={styles.textContainer}>
              {item?.heading && <h3>{item?.heading}</h3>}
              {item?.isReadmore ? (
                <Description
                  compData={{
                    description: item?.description,
                    readMore: item?.readMore,
                    readLess: item?.readLess,
                  }}
                />
              ) : (
                item?.description && <p>{item?.description}</p>
              )}
              {item?.link && item?.linkText && !item?.isReadmore && (
                <CustomLink
                  href={item?.link}
                  variant={'underline'}
                  target={item?.linkTarget}
                  onClick={() => {
                    GTMHelper({
                      ...item?.gtmData,
                    });
                  }}
                >
                  {item?.linkText}
                </CustomLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoColumnList;
