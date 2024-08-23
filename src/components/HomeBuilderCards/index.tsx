import { IHomeBuilderCards } from '@interfaces';
import CardItem from './CardItem';
import styles from './homeBuilderCards.module.scss';

const HomeBuilderCards = (props: { compData: IHomeBuilderCards }) => {
  const { compData } = props;
  const { heading = '', cardData } = compData;
  return (
    <div className={styles.wrapper}>
      <div className="container">
        {heading && <h1 className={styles.heading}>{heading}</h1>}
        <div className="row">
          {cardData?.map((item, index) => <CardItem key={`${heading + index}`} compData={item} />)}
        </div>
      </div>
    </div>
  );
};

export default HomeBuilderCards;
