import { CustomImage } from '@components';
import styles from './noresult.module.scss';

const NoResult = (props: any) => {
  const { data, isOverlay = false } = props;

  if (!data) return <></>;

  return (
    <div className="container">
      {!isOverlay && (
        <div className={styles.headingWrapper}>
          <h1 className={styles.mainHeading}>{data?.heading}</h1>
          <span>{data?.subHeading}</span>
        </div>
      )}
      <div className={styles.wrapper}>
        <CustomImage
          src={{
            mobileSource: data?.imageSourceMobile,
            tabletSource: data?.imageSourceTablet,
            defaultSource: data?.imageSource,
          }}
          loader="false"
          alt={data?.imageAlt}
        />
        <h3 className={styles.title}>{data?.title}</h3>
        <p className={styles.description}>{data?.text}</p>
      </div>
    </div>
  );
};
export default NoResult;
