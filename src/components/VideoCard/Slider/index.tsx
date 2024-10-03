import { IVideoCardItem, IVideoCardSlider } from '@interfaces';
import { GTMHelper, getIconByName } from '@utils';
import React from 'react';
import BaseSlider from 'src/components/BaseSlider';
import CustomImage from 'src/components/CustomImage';
import CustomLink from 'src/components/CustomLink';
import styles from './slider.module.scss';

const Slider = (props: IVideoCardSlider) => {
  const { compData } = props;

  const sliderCard = () => {
    return compData?.gallery?.map((item: IVideoCardItem, index: number) => (
      <div key={`${item?.cardHeading + index}`} className={styles.item}>
        <CustomLink
          className={styles.arrow}
          href={item?.link}
          target={item?.linkTarget}
          onClick={() => {
            GTMHelper({
              ...item?.gtmData,
            });
          }}
        >
          <div className={styles.imageWrapper}>
            <CustomImage
              loader="false"
              src={{
                defaultSource: item?.imageSource,
              }}
              alt={item?.imageAlt}
            />
            {item?.imageSourceHover && (
              <div className={styles.hovered}>
                <CustomImage
                  loader="false"
                  src={{
                    defaultSource: item?.imageSourceHover,
                  }}
                  alt={item?.imageAlt}
                />
              </div>
            )}
            <span>{getIconByName(item?.playIcon)}</span>
          </div>
        </CustomLink>

        <div className={styles.textContainer}>
          {item?.cardHeading && <h3>{item?.cardHeading}</h3>}
          {item?.description && <p className={styles.description}>{item?.description}</p>}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.wrapper}>
      {typeof window !== 'undefined' && window?.innerWidth <= 991 ? (
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
                  arrows: false,
                },
              },
              {
                breakpoint: 991,
                settings: {
                  arrows: true,
                  slidesToShow: 2.4,
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
          <React.Fragment key=".0">{sliderCard()}</React.Fragment>
        </BaseSlider>
      ) : (
        <div className={styles.desktopView}>{sliderCard()}</div>
      )}
    </div>
  );
};

export default Slider;
