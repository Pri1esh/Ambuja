import { BaseSlider, CustomImage, CustomLink, CustomVideo } from '@components';
import { IMainBanner, IMainBannerMedia } from '@interfaces';
import { GTMHelper } from '@utils';
import cx from 'classnames';
import React from 'react';
import styles from './mainBanner.module.scss';

const MainBanner = (props: IMainBanner) => {
  const { compData } = props;
  const { data } = compData;

  return (
    <section className={styles.wrapper}>
      <BaseSlider
        settings={{
          dots: true,
          infinite: true,
          speed: 800,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          autoplay: true,
          autoplaySpeed: 5000,
          arrows: true,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: { arrows: false },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {data?.map((item: IMainBannerMedia, index: number) => (
            <div key={`${(item?.videoSourceMobile ?? item?.imageSource) + index}`}>
              <div className={styles.contentWrapper}>
                <div className={styles.textWrapper}>
                  {item?.heading && <h2 className={`${styles.heading} ${styles.slideUp}`}>{item?.heading}</h2>}
                  {item?.subHeading && <p className={`${styles.subHeading} ${styles.slideUp}`}>{item?.subHeading}</p>}

                  {item?.link && (
                    <div className={cx(styles.btnWrapper, styles.slideUp)}>
                      <CustomLink
                        href={item?.link}
                        variant={'button'}
                        target={item?.linkTarget}
                        onClick={() => {
                          GTMHelper({ ...item?.gtmData });
                        }}
                      >
                        {item?.linkText}
                      </CustomLink>
                    </div>
                  )}
                </div>
              </div>
              {item?.mediaType === 'video' ? (
                <div className={styles.videoWrapper}>
                  <CustomVideo
                    compData={{
                      defaultVideoSource: item?.videoSource,
                      defaultVideoSourceOgg: item?.videoSourceOGG,
                      isOverlayRequired: item?.isOverlayRequired,
                      autoplay: item?.autoplay,
                      defaultVideoSourceMobile: item?.videoSourceMobile,
                      defaultVideoSourceMobileOgg: item?.videoSourceMobileOGG,
                      defaultVideoSourceTablet: item?.videoSourceTablet,
                      defaultVideoSourceTabletOgg: item?.videoSourceTabletOGG,
                    }}
                  />
                </div>
              ) : (
                <div className={styles.item}>
                  {item?.imageSource && (
                    <CustomImage
                      src={{
                        mobileSource: item?.imageSourceMobile,
                        tabletSource: item?.imageSourceTablet,
                        defaultSource: item?.imageSource,
                      }}
                      alt={item?.imageAlt}
                      lazy="false"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </section>
  );
};

export default MainBanner;
