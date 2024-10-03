import { CustomImage } from '@components';
import { IFeatureCard } from '@interfaces';
import styles from './featuresCard.module.scss';

const Card = (props: { compData: IFeatureCard }) => {
  const { compData } = props;
  return (
    <div className={styles.cardList}>
      {compData?.imageSource && (
        <span className={styles.staticImage}>
          <CustomImage
            lazy="false"
            src={{
              mobileSource: compData?.imageSourceMobile,
              tabletSource: compData?.imageSourceTablet,
              defaultSource: compData?.imageSource,
            }}
            alt={compData?.imageAlt}
            loader="false"
          />
        </span>
      )}
      <span className={styles.hoverEffect}>
        <CustomImage
          lazy="false"
          src={{
            defaultSource: compData?.hoverImageSource ? compData?.hoverImageSource : compData?.imageSource,
          }}
          alt={compData?.imageAlt}
          loader="false"
        />
      </span>
      {compData?.heading && <h3>{compData?.heading}</h3>}
      {compData?.description && <p>{compData?.description}</p>}
    </div>
  );
};

export default Card;
