import { CustomImage, CustomLink } from '@components';
import { IDetails } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import styles from './details.module.scss';

const Details = (props: IDetails) => {
  const {
    heading,
    subHeading,
    linkText,
    link,
    linkTarget,
    imageSource,
    imageSourceMobile,
    imageSourceTablet,
    imageAlt,
  } = props;
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === 'mobile';
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
        {heading && <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />}
        {link && !isMobile ? (
          <CustomLink
            href={link}
            variant={'button'}
            target={linkTarget}
            onClick={() => {
              GTMHelper({ ...props?.gtmData });
            }}
          >
            {linkText}
          </CustomLink>
        ) : (
          ''
        )}
      </div>
      <div className={styles.imgWrapper}>
        {imageSource && !isMobile ? (
          <CustomImage
            src={{
              mobileSource: imageSourceMobile,
              tabletSource: imageSourceTablet,
              defaultSource: imageSource,
            }}
            loader="false"
            alt={imageAlt}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Details;
