import { BaseSlider, CustomIcon, CustomImage, CustomLink } from '@components';
import { ISlider, ISliderCardData, ISliderGalleryData } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
import styles from './slider.module.scss';

const Slider = (props: ISlider) => {
  const { gallery } = props;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const sliderCard = (item: ISliderCardData) => {
    return (
      <>
        {item?.link ? (
          <CustomLink href={item?.link}>
            <div className={styles.item}>
              {item.imageSource && (
                <CustomImage
                  src={{
                    mobileSource: item?.imageSourceMobile,
                    tabletSource: item?.imageSourceTablet,
                    defaultSource: item?.imageSource,
                  }}
                  alt={item.imageAlt}
                />
              )}

              <div className={styles.textContainer}>
                <div className={styles.textWrapper}>
                  {item?.heading && <h3>{item?.heading}</h3>}
                  {item?.description && <p>{item?.description}</p>}
                </div>

                {!isMobile && (
                  <div className={styles.arrowWrapper}>
                    <div className={styles.arrow}>
                      <CustomIcon iconName={'up'} />
                      <span>{item?.heading}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CustomLink>
        ) : (
          <div className={styles.item}>
            {item.imageSource && (
              <CustomImage
                src={{
                  mobileSource: item?.imageSourceMobile,
                  tabletSource: item?.imageSourceTablet,
                  defaultSource: item?.imageSource,
                }}
                alt={item.imageAlt}
              />
            )}

            <div className={styles.textContainer}>
              <div className={styles.textWrapper}>
                {item?.heading && <h3>{item?.heading}</h3>}
                {item?.description && <p>{item?.description}</p>}
              </div>

              {!isMobile && (
                <div className={styles.arrowWrapper}>
                  <div className={styles.arrow}>
                    <CustomIcon iconName={'up'} />
                    <span>{item?.heading}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <BaseSlider
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: true,
          arrows: true,
          autoplay: false,
          draggable: false,
          autoplaySpeed: 2200,
          cssEase: 'linear',
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 1.5,
                arrows: false,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {gallery?.map((item: ISliderGalleryData, index: number) => (
            <div key={`${item?.link + index}`}>
              <div>{sliderCard(item)}</div>
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default Slider;
