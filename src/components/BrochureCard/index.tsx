import { CustomImage, CustomLink } from '@components';
import { IBrochureCard } from '@interfaces';
import { GTMHelper, useDeviceType } from '@utils';
import styles from './brochureCard.module.scss';

const BrochureCard = (props: { compData: IBrochureCard }) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">
          <div className={`col-xl-9 col-sm-12 ${styles.textContainer}`}>
            {compData?.subHeading && <h3>{compData?.subHeading}</h3>}
            {compData?.heading && <h2>{compData?.heading}</h2>}
            {compData?.description && (
              <div className={styles.desc} dangerouslySetInnerHTML={{ __html: compData?.description }} />
            )}
            {compData?.link && (
              <CustomLink
                href={compData?.link}
                variant={'brandcolor'}
                target={compData?.linkTarget}
                download
                onClick={() => {
                  GTMHelper({ ...compData?.gtmData });
                }}
              >
                {compData?.linkText}
              </CustomLink>
            )}
          </div>
        </div>
      </div>
      {deviceType === 'desktop' && (
        <div className={styles.imgContainer}>
          <CustomImage
            lazy="false"
            src={{
              mobileSource: compData?.imageSourceMobile,
              tabletSource: compData?.imageSourceTablet,
              defaultSource: compData?.imageSource,
            }}
            loader="false"
            alt={compData?.imageAlt}
          />
        </div>
      )}
    </div>
  );
};

export default BrochureCard;
