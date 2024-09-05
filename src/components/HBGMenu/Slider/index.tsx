import { BaseSlider, CustomIcon, CustomImage, CustomLink } from '@components';
import { ISlider, ISliderCardData, ISliderGalleryData } from '@interfaces';
import { useDeviceType } from '@utils';
import React from 'react';
// import styles from './slider.module.scss';
import Image from 'next/image';
import styles from '../scaleSlider.module.scss';
import rightarrow from '../../../assets/icons/arrowrighttail.svg';

const Slider = (props: ISlider) => {
  const { gallery } = props;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  console.log(gallery);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.dreamHomeReality}>
          <React.Fragment key=".0">
            {gallery?.map((item: ISliderGalleryData, index: number) => (
              <div key={`${item?.link + index}`} className={styles.childDreamHome}>
                <CustomImage
                  lazy="false"
                  src={{
                    mobileSource: item?.imageSourceMobile,
                    tabletSource: item?.imageSourceTablet,
                    defaultSource: item?.imageSource,
                  }}
                  loader="false"
                  alt={item.imageAlt}
                  className={styles.dreamHomeImg}
                />

                <div className={styles.contentData}>
                  {item?.heading && <p className={styles.mainHead}>{item?.heading}</p>}
                  {item.description && <p className={styles.dataHead}>{item?.description}</p>}
                  <a href={item.link}>
                  <button className={styles.viewDetails}>
                    View Details
                    <Image src={rightarrow} alt="->" />
                  </button>
                  </a>
                </div>
              </div>
            ))}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default Slider;
