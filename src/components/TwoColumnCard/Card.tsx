import MediaCard from './MediaCard';
import TextCard from './TextCard';
import styles from './twoColumnCard.module.scss';

const getTheme = (theme: string) => {
  switch (true) {
    case theme?.includes('dark'):
      return styles.dark;
    case theme?.includes('light'):
      return styles.light;
    default:
      return '';
  }
};

const Card = (props: any) => {
  const { theme, cardData } = props;
  return (
    <div
      className={`${getTheme(theme)} ${styles.twoColumnCardWrapper}  ${
        cardData?.textFirst === false ? styles.reverseColumn : ''
      }`}
    >
      <TextCard cardData={cardData} />
      <MediaCard cardData={cardData} />
    </div>
  );
};

export default Card;
