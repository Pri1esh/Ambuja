import { ICardSliderDetails } from '@interfaces';
import { useDeviceType } from '@utils';
import CustomImage from 'src/components/CustomImage';
import styles from './details.module.scss';
const Details = (props: ICardSliderDetails) => {
  const { compData } = props;
  const { heading, subHeading, imageSource, imageSourceMobile, imageSourceTablet, imageAlt } = compData;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';

  return (
    <div className={styles.wrapper}>
      {imageSource && !isMobile ? (
        <CustomImage
          src={{
            mobileSource: imageSourceMobile,
            tabletSource: imageSourceTablet,
            defaultSource: imageSource,
          }}
          alt={imageAlt}
          loader="false"
        />
      ) : (
        ''
      )}
      {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      {heading && <h2 className={styles.heading}>{heading}</h2>}
    </div>
  );
};

export default Details;
