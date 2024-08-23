import { CustomIcon, CustomImage, CustomLink } from '@components';
import { IPrevNextArrow, IVerticalCarousel } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import FeatureList from './FeatureList';
import styles from './verticalCarousel.module.scss';

const Arrow = (props: IPrevNextArrow) => {
  const { className, onClick } = props;
  return (
    <button className={className} onClick={onClick} aria-label="arrow">
      <CustomIcon iconName={'up'} />
    </button>
  );
};

const VerticalCarousel = (props: IVerticalCarousel) => {
  const { compData } = props;
  const mainSlider = useRef<any>();
  const thumbSlider = useRef<any>();
  const { deviceType } = useDeviceType();
  const [showThumb, setShowThumb] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowThumb(true), 0);
  }, []);

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window?.innerWidth <= 991);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window !== 'undefined' && window?.innerWidth]);

  useEffect(() => {
    const currSlide = document.querySelectorAll(`.${styles.mainSlider} .slick-slide`)[slideIndex + 1];
    const prevSlide = document.querySelectorAll(`.${styles.mainSlider} .slick-slide`)[slideIndex];
    document.querySelectorAll(`.${styles.mainSlider} .slick-slide`).forEach((slide) => {
      slide.classList.remove(styles.prevItem);
    });
    if (currSlide) {
      currSlide.classList.add(styles.prevItem);
    }
    if (prevSlide) {
      prevSlide.classList.remove(styles.prevItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex]);

  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    asNavFor: deviceType !== 'mobile' ? thumbSlider.current : '',
    className: `slider center ${styles.mainSlider}`,
    beforeChange: (_: number, nextSlide: number) => {
      setSlideIndex(nextSlide);
    },
    responsive: [
      {
        breakpoint: 1199,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 991,
        settings: { slidesToShow: 1, centerPadding: '85px', centerMode: true, arrows: false },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, centerPadding: '70px', centerMode: true, arrows: false },
      },
    ],
  };

  const thumbSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    asNavFor: mainSlider.current,
    beforeChange: (nextSlide: number, currentSlide: number) => {
      if (currentSlide === thumbSettings.slidesToShow - 1 && nextSlide === 0) {
        mainSlider.current?.slickGoTo(0);
      } else {
        mainSlider.current?.slickGoTo(nextSlide);
      }
    },
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    className: styles.thumbArrow,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div className={styles.wrapper}>
      <div className={isMobile ? '' : 'container'}>
        <div className={isMobile ? '' : 'row'}>
          {deviceType !== 'mobile' && (
            <div className={styles.star}>
              <CustomImage
                itemProp="image"
                src={{ defaultSource: compData?.starImage }}
                alt={compData?.starImageAlt}
                loader="false"
              />
            </div>
          )}
          <div className="col">
            <div className={styles.products}>
              <div className={styles.productSlider}>
                <h2 className={styles.mobSectionHeading}>{compData?.sectionHeading}</h2>
                <Slider {...mainSettings} ref={mainSlider}>
                  {compData?.data?.map((item, index: number) => (
                    <div className={`${styles.productItem}`} key={`${index + item?.id}`}>
                      <div className={styles.productDetail}>
                        <div className={styles.sectionHeading}>{compData?.sectionHeading}</div>
                        {item?.heading && (
                          <h2 className={`${isMobile ? styles.mobileHeading : ''}`}>{item?.heading}</h2>
                        )}
                        {item?.description && (
                          <>
                            {deviceType === 'mobile' ? (
                              <p className={styles.description}>{item?.description?.slice(0, 80)}...</p>
                            ) : (
                              <p className={styles.description}>{item?.description}</p>
                            )}
                          </>
                        )}
                        <FeatureList data={item?.features} />
                        <div>
                          <CustomLink
                            href={item?.link}
                            variant={deviceType === 'mobile' ? 'primary' : 'bordered'}
                            target={item?.linkTarget}
                            className={styles.button}
                            onClick={() => {
                              GTMHelper({ ...item?.gtmData });
                            }}
                          >
                            {item?.linkText}
                          </CustomLink>
                        </div>
                      </div>
                      {(item?.imageSource || item?.imageSourceMobile || item?.imageSourceTablet) && (
                        <div className={styles.productImg}>
                          <CustomImage
                            itemProp="image"
                            className={styles.slick_slide_image}
                            src={{
                              mobileSource: item?.imageSourceMobile,
                              tabletSource: item?.imageSourceTablet,
                              defaultSource: item?.imageSource,
                            }}
                            alt={item.imageAlt}
                            loader="false"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </Slider>
              </div>

              {deviceType !== 'mobile' && (
                <div className={styles.thumbnailSliderWrap}>
                  <div className={styles.thumbnail_slider_wrap}>
                    <Slider {...thumbSettings} ref={thumbSlider}>
                      {showThumb &&
                        compData?.data?.map((item, index: number) => (
                          <div className={styles.thumbItem} key={`${index + item?.id}`}>
                            <CustomImage
                              itemProp="image"
                              className={styles.slick_slide_image}
                              src={{
                                mobileSource: item?.imageSourceMobile,
                                tabletSource: item?.imageSourceTablet,
                                defaultSource: item?.imageSource,
                              }}
                              alt={item.imageAlt}
                              loader="false"
                            />
                          </div>
                        ))}
                    </Slider>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
