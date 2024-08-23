import { CustomImage } from '@components';
import { ITextSection } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './costCalculatorWidget.module.scss';

const TextSection = (props: { compData: ITextSection }) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();
  const { imageSource, imageSourceMobile, imageSourceTablet, heading, description, imageAlt } = compData;

  return (
    <div className={styles.section}>
      {deviceType !== 'mobile' && (
        <div className={styles.figure}>
          <CustomImage
            src={{ defaultSource: imageSource, mobileSource: imageSourceMobile, tabletSource: imageSourceTablet }}
            alt={imageAlt}
            loader="false"
          />
        </div>
      )}
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {deviceType !== 'mobile' && description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default TextSection;
