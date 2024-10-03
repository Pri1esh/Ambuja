import { BaseSlider, CustomImage, CustomLink } from '@components';
import { IRelatedProductItem, IRelatedProductSlider } from '@interfaces';
import { GTMHelper } from '@utils';
import React from 'react';
import styles from './slider.module.scss';

const Slider = (props: IRelatedProductSlider) => {
  const { cardDetails } = props;

  const sliderCard = (item: IRelatedProductItem) => {
    return (
      <div className={styles.item}>
        {item.imageSource && (
          <div className={styles.imageWrapper}>
            <CustomImage
              src={{
                mobileSource: item?.imageSourceMobile,
                tabletSource: item?.imageSourceTablet,
                defaultSource: item?.imageSource,
              }}
              alt={item.imageAlt}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          {item?.heading && <h3>{item?.heading}</h3>}
          {item?.description && <p className={styles.description}>{item?.description}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper} ${cardDetails?.variant === 'dealerPage' ? styles.dealerWrapper : ''}`}>
      <BaseSlider
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: false,
          speed: 400,
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          autoplay: false,
          autoplaySpeed: 2200,
          cssEase: 'linear',
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2.5,
                arrows: false,
              },
            },

            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {cardDetails?.gallery?.map((item: IRelatedProductItem, key: number) => (
            <div key={`${item?.link + key}`} className={styles.itemWrapper}>
              {item?.link ? (
                <CustomLink
                  variant={'anchor'}
                  href={item?.link}
                  target={item?.linkTarget}
                  onClick={() => {
                    GTMHelper({
                      ...item?.gtmData,
                    });
                  }}
                >
                  {sliderCard(item)}
                </CustomLink>
              ) : (
                sliderCard(item)
              )}
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default Slider;
