import { ICardData } from '@interfaces';
import { useDeviceType } from '@utils';
import CustomImage from '../CustomImage';
import styles from './twoColumnCard.module.scss';

const HBGVisionCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;
  const { deviceType } = useDeviceType();
  const { imageSource, imageSourceMobile, imageSourceTablet, imageAlt, iconImage, textData, iconImageAlt, sectionID } =
    cardData;

  return (
    <div className={styles.visionWrapper} id={sectionID}>
      <div className={`container ${styles.sectionWrapper}`}>
        <div className={styles.section}>
          {deviceType === 'desktop' && (
            <div className={styles.figure}>
              <CustomImage src={{ defaultSource: iconImage ?? '' }} alt={iconImageAlt} loader="false" />
            </div>
          )}
          {textData?.map((item: any, index: number) => (
            <div className={styles.visionTextWrapper} key={`${item?.heading + index}`}>
              {item?.heading && <h2 className={styles.heading}>{item?.heading}</h2>}
              {item?.description && <p className={styles.description}>{item?.description}</p>}
            </div>
          ))}
        </div>
        <div className={styles.imgWrapper}>
          <CustomImage
            src={{ defaultSource: imageSource ?? '', mobileSource: imageSourceMobile, tabletSource: imageSourceTablet }}
            alt={imageAlt}
            loader="false"
          />
        </div>
      </div>
    </div>
  );
};

export default HBGVisionCard;
