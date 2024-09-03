import { ITwoColumnCard } from '@interfaces';
import Card from './Card';
import CardList from './CardList';
import MessageCard from './MessageCard';
import VisionCard from './VisionCardcard';
import styles from './twoColumnCard.module.scss';

const TwoColumnCard = (props: ITwoColumnCard) => {
  const { compData } = props;
  const { data, variant, theme } = compData;

  const getCardType = (variant: string) => {
    switch (variant) {
      case 'card':
        return <Card cardData={data[0]} theme={theme} />;
      case 'messageCard':
        return <MessageCard cardData={data[0]} />;
      case 'visionCard':
        return <VisionCard cardData={data[0]} />;
      case 'cardList':
        return <CardList cardData={data} />;
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

export default TwoColumnCard;
