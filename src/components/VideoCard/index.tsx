import { IVideoCard } from '@interfaces';
import Slider from './Slider';
import styles from './videoCard.module.scss';

const VideoCard = (props: IVideoCard) => {
  const { compData, noMargin = false } = props;
  return (
    <div>
      {compData?.map((item: any, index: any) => (
        <div key={`${item?.heading + index}`} className={`${noMargin ? '' : styles.extraMargin} ${styles.wrapper}`}>
          {item?.heading && <h1 className={styles.heading}>{item?.heading}</h1>}
          <Slider compData={item} noMargin={true} />
        </div>
      ))}
    </div>
  );
};

export default VideoCard;
