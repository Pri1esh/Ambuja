import { ITwoColumnCard } from '@interfaces';
import HBGCard from './Card';
import HBGCardList from './CardList';
import HBGMessageCard from './MessageCard';
import HBGVisionCard from './VisionCardcard';
import styles from './twoColumnCard.module.scss';

const HBGColumnCard = (props: ITwoColumnCard) => {
  const { compData } = props;
  const { data, variant, theme } = compData;

  const getCardType = (variant: string) => {
    switch (variant) {
      case 'card':
        return <HBGCard cardData={data[0]} theme={theme} />;
      case 'messageCard':
        return <HBGMessageCard cardData={data[0]} />;
      case 'visionCard':
        return <HBGVisionCard cardData={data[0]} />;
      case 'cardList':
        return <HBGCardList cardData={data} />;
      default:
        return <></>;
    }
  };

  return (
    <section className={`${variant === 'text' ? styles.alignTextCenter : ''}`} id={compData?.sectionID}>
      {getCardType(variant)}
    </section>
  );
};

export default HBGColumnCard;
