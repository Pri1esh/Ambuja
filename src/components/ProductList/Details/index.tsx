import { IProductList } from '@interfaces';
import CustomImage from 'src/components/CustomImage';
import styles from './details.module.scss';
const Details = (props: IProductList) => {
  const { compData } = props;
  const { heading, subHeading, imageSource, imageAlt } = compData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
        {heading && <h2 className={styles.heading}>{heading}</h2>}
      </div>
      <div className={styles.imgContainer}>
        <CustomImage
          src={{
            defaultSource: imageSource,
          }}
          loader="false"
          alt={imageAlt}
        />
      </div>
    </div>
  );
};

export default Details;
