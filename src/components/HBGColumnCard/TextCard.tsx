import { Button, CustomLink } from '@components';
import { ICardData } from '@interfaces';
import { GTMHelper } from '@utils';
import { useState } from 'react';
import styles from './twoColumnCard.module.scss';

const HBGTextCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={`${styles.textWrapper}`}>
      {cardData?.subHeading && <p className={styles.subHeading}>{cardData?.subHeading}</p>}
      {cardData?.heading && <h2 className={styles.heading}>{cardData?.heading}</h2>}
      {cardData?.description && (
        <div
          className={`${styles.description} ${!isExpanded ? styles.truncated : ''}`}
          dangerouslySetInnerHTML={{ __html: cardData?.description }}
        ></div>
      )}
      {cardData?.subDescription && <p className={styles.subDescription}>{cardData?.subDescription}</p>}
      {cardData?.linkText && !cardData?.isReadMore && (
        <div className={styles.buttonWrapper}>
          <CustomLink
            href={cardData?.link}
            variant={'underline'}
            target={cardData?.linkTarget}
            onClick={() => {
              GTMHelper({ ...cardData?.gtmData });
            }}
          >
            {cardData?.linkText}
          </CustomLink>
        </div>
      )}
      {cardData?.isReadMore && (
        <div className={styles.buttonWrapper}>
          <Button
            isActive="false"
            variant="button"
            onClick={() => {
              setIsExpanded(!isExpanded);
              GTMHelper({ ...cardData?.gtmData });
            }}
          >
            {isExpanded ? cardData?.readLess : cardData?.readMore}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HBGTextCard;
