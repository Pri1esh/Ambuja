import { CustomImage, Overview } from '@components';
import { IVectorCard } from '@interfaces';
import classNames from 'classnames';
import Description from './description';
import styles from './vectorCard.module.scss';

const VectorCard = (props: IVectorCard) => {
  const { compData, overview } = props;
  return (
    <div className={styles.cardWrapper}>
      {overview && (
        <div className="container">
          <Overview compData={overview} />
        </div>
      )}
      <div className="container">
        {compData?.data?.map((item, index) => (
          <div key={`${item?.imageAlt + index}`} className={classNames('row', styles.cardItem)}>
            <div className={classNames('col-lg-4', styles.imgWrapper)}>
              <CustomImage
                src={{
                  defaultSource: item?.imageSource,
                  mobileSource: item?.imageSourceMobile,
                  tabletSource: item?.imageSourceTablet,
                }}
                alt={item?.imageAlt}
                loader="false"
              />
            </div>
            <div className={'col-lg-8'}>
              <div className={styles.textWrapper}>
                <h3>
                  <span>{item?.sequence ?? `0${index + 1}`}</span> {item?.heading}
                </h3>
                <p className={styles.desktopDesc}>{item?.description}</p>
                <Description
                  compData={{
                    description: item?.description,
                    readMore: compData?.readMore,
                    readLess: compData?.readLess,
                  }}
                />
              </div>
            </div>
            <div className={styles.bordered}>
              <span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VectorCard;
