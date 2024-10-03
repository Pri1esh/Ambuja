import { Breadcrumbs, CustomImage, DealerLocator } from '@components';
import { ILocatorBanner } from '@interfaces';
import { useDeviceType } from '@utils';
import styles from './locatorBanner.module.scss';

const LocatorBanner = (props: ILocatorBanner) => {
  const { deviceType } = useDeviceType();
  const { dealerLocatorData, compData, setShowToast, setToastMessage, breadCrumbList } = props;
  const { heading, subHeading, imageSource, imageSourceMobile, imageSourceTablet, imageAlt } = compData;

  return (
    <section className={styles.wrapper}>
      {breadCrumbList && breadCrumbList?.items?.length > 0 && (
        <div className="container">
          <Breadcrumbs list={breadCrumbList?.items} className={styles.breadCrumb} />
        </div>
      )}
      {heading && (
        <div className="container">
          <div className={styles.contentWrapper}>
            <div className={styles.textWrapper}>
              {heading && <h2 className={`${styles.heading} ${styles.slideUp}`}>{heading}</h2>}
              {deviceType !== 'mobile' && subHeading && <p className={styles.subHeading}>{subHeading}</p>}
            </div>
          </div>
        </div>
      )}
      <div className={styles.imageWrapper}>
        {imageSource && (
          <CustomImage
            src={{
              mobileSource: imageSourceMobile,
              tabletSource: imageSourceTablet,
              defaultSource: imageSource,
            }}
            lazy="false"
            alt={imageAlt}
          />
        )}
        {dealerLocatorData && (
          <div className={styles.searchWrapper}>
            <DealerLocator compData={dealerLocatorData} setShowToast={setShowToast} setToastMessage={setToastMessage} />
          </div>
        )}
      </div>
    </section>
  );
};

export default LocatorBanner;
