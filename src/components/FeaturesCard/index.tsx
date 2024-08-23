import { BaseSlider } from '@components';
import { IFeaturesCards } from '@interfaces';
import React from 'react';
import Card from './card';
import styles from './featuresCard.module.scss';

const FeaturesCard = (props: { compData: IFeaturesCards }) => {
  const { compData } = props;

  return (
    <div className={styles.wrapper}>
      {compData?.heading && <h2>{compData?.heading}</h2>}
      <BaseSlider
        classname={styles.slider}
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: false,
          speed: 400,
          slidesToShow: 4,
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
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {compData?.gallery?.map((item, index) => <Card key={`${item?.heading + index}`} compData={item} />)}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default FeaturesCard;
