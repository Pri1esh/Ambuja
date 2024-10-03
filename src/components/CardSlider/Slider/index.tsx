import { BaseSlider, CustomLink } from '@components';
import { ICardSliderData, ISliderCardData } from '@interfaces';
import { GTMHelper } from '@utils';
import React from 'react';
import styles from './slider.module.scss';

const Slider = (props: ICardSliderData) => {
  const { cardDetails } = props;

  const sliderCard = (item: ISliderCardData) => {
    return (
      <div className={styles.item}>
        <div className={styles.textContainer}>
          {item?.description && <p className={styles.description}>{item?.description}</p>}
          <div className={styles.author}>
            {item?.heading && <h3>{item?.heading}</h3>}
            {item?.date && <p>{item?.date}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <BaseSlider
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: false,
          speed: 400,
          slidesToShow: 3.4,
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
                slidesToShow: 2.4,
                arrows: true,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2.4,
                arrows: false,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1.4,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {cardDetails?.gallery?.map((item: ISliderCardData, key: number) => (
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
