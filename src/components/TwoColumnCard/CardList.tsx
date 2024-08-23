import { CustomImage, CustomLink } from '@components';
import { ICardListData } from '@interfaces';
import { GTMHelper } from '@utils';
import styles from './twoColumnCard.module.scss';

const CardList = (props: ICardListData) => {
  const { cardData } = props;
  return (
    <div className={styles.cardWrapper}>
      {cardData?.map((item: any, index: number) => (
        <div
          className={`container ${styles.sectionWrapper} ${item.textFirst === false ? styles.cardReverseColumn : ''}`}
          key={`${item?.heading + index}`}
        >
          <div className={styles.section}>
            <div className={styles.cardTextWrapper}>
              {item?.heading && <h2 className={styles.heading}>{item?.heading}</h2>}

              {item?.description && (
                <p className={`${item?.linkText ? styles.trimDescription : ''} ${styles.description}`}>
                  {item?.description}
                </p>
              )}
              {item?.linkText && (
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

          <div className={styles.cardImgWrapper}>
            <div className={styles.imageWrapper}>
              {item?.linkText !== '' ? (
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
                  <CustomImage
                    src={{
                      defaultSource: item?.imageSource || '',
                      mobileSource: item?.imageSourceMobile,
                      tabletSource: item?.imageSourceTablet,
                    }}
                    alt={item?.imageAlt}
                    loader="false"
                  />
                </CustomLink>
              ) : (
                <CustomImage
                  src={{
                    defaultSource: item?.imageSource || '',
                    mobileSource: item?.imageSourceMobile,
                    tabletSource: item?.imageSourceTablet,
                  }}
                  alt={item?.imageAlt}
                  loader="false"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
