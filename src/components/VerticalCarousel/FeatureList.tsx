import { CustomImage } from '@components';
import { IFeatureList } from '@interfaces';
import styles from './verticalCarousel.module.scss';

const FeatureList = (props: { data: IFeatureList[] }) => {
  return (
    <div className={styles.features}>
      {props.data?.map((item: IFeatureList, index) => (
        <div className={styles.featureItem} key={`${index + item?.imageAlt}`}>
          <CustomImage src={{ defaultSource: item?.imageSource }} alt={item?.imageAlt} loader="false" />
          {item?.heading && <p>{item?.heading}</p>}
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
