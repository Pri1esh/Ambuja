import { CustomImage, Overview } from '@components';
import { ICardList } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import CustomLink from '../CustomLink';
import Description from '../VectorCard/description';
import styles from './cardList.module.scss';

const CardList = (props: ICardList) => {
  const { compData, overview } = props;
  const { deviceType } = useDeviceType();

  return (
    <div className={styles.wrapper}>
      {overview && <Overview compData={overview} className={styles.overview} />}
      <div className={styles.listWrapper}>
        {compData?.cards?.map((item, index: number) => (
          <div className={styles.item} key={`${item?.heading + index}`}>
            {item.imageSource && (
              <div className={styles.imageWrapper}>
                {item?.linkText !== '' ? (
                  <CustomLink
                    href={item?.link}
                    target={item?.linkTarget}
                    onClick={() => {
                      GTMHelper({
                        ...item?.gtmData,
                      });
                    }}
                  >
                    <CustomImage
                      src={{
                        mobileSource: item?.imageSourceMobile,
                        tabletSource: item?.imageSourceTablet,
                        defaultSource: item?.imageSource,
                      }}
                      alt={item.imageAlt}
                    />
                  </CustomLink>
                ) : (
                  <CustomImage
                    src={{
                      mobileSource: item?.imageSourceMobile,
                      tabletSource: item?.imageSourceTablet,
                      defaultSource: item?.imageSource,
                    }}
                    alt={item.imageAlt}
                  />
                )}
              </div>
            )}
            <div className={styles.textContainer}>
              {item?.heading && <h3>{item?.heading}</h3>}
              {item?.description && (
                <>
                  {item?.readless && deviceType === 'mobile' && (
                    <Description
                      compData={{
                        description: item?.description,
                        readLess: item?.readless,
                        readMore: item?.linkText,
                      }}
                    />
                  )}
                  {item?.readless && deviceType !== 'mobile' && <p>{item?.description}</p>}
                  {!item?.readless && (
                    <>
                      <p>{item?.description}</p>
                      {item?.link && item?.linkText && (
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
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
