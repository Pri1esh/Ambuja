'use client';
import { IRelatedProducts } from '@interfaces';
import { useDeviceType } from '@utils';
import Slider from './Slider';
import styles from './relatedProducts.module.scss';

const RelatedProducts = (props: IRelatedProducts) => {
  const { compData, noMargin = false } = props;
  const { deviceType } = useDeviceType();
  return (
    <div
      className={`${noMargin ? '' : styles.extraMargin} ${compData?.theme?.includes('blue') ? styles.blueTheme : ''} ${
        styles.wrapper
      }`}
      id={compData?.sectionID}
    >
      <div className="container">
        {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
        {compData?.link && deviceType === 'mobile' && (
          <a className={styles.link} href={compData?.link} target={compData?.linkTarget}>
            {compData?.linkText}
          </a>
        )}
        <Slider cardDetails={compData} />
      </div>
    </div>
  );
};

export default RelatedProducts;
