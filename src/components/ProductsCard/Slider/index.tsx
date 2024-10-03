import { BaseSlider, CustomImage, CustomLink } from '@components';
import { IRelatedProductItem, IRelatedProductSlider } from '@interfaces';
import { getIconByName, GTMHelper } from '@utils';
import React from 'react';
import styles from './slider.module.scss';

const Slider = (props: IRelatedProductSlider) => {
  const { cardDetails } = props;

  const sliderCard = (item: IRelatedProductItem, variant?: string) => {
    return (
      <div className={`${styles.item} ${variant?.includes('secondary') ? styles.secondary : ''}`}>
        {item?.badge && (
          <div className={styles.badge}>
            <span className={styles.icon}>{getIconByName('star')}</span>
            {item?.badge}
          </div>
        )}
        {item.imageSource && (
          <div className={styles.imageWrapper}>
            <CustomImage
              src={{
                mobileSource: item?.imageSourceMobile,
                tabletSource: item?.imageSourceTablet,
                defaultSource: item?.imageSource,
              }}
              loader="false"
              alt={item.imageAlt}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          {item?.heading && <h3>{item?.heading}</h3>}
          {item?.description && <p>{item?.description}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <BaseSlider
        isMobSlider={true}
        classname={cardDetails?.variant?.includes('secondary') ? styles.secondary : ''}
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
                slidesToShow: 2.3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                arrows: false,
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
                  {sliderCard(item, cardDetails?.variant)}
                </CustomLink>
              ) : (
                sliderCard(item, cardDetails?.variant)
              )}
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default Slider;
