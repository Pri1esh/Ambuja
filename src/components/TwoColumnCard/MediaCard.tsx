import { CustomImage, CustomVideo } from '@components';
import { ICardData } from '@interfaces';
import styles from './twoColumnCard.module.scss';

const MediaCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;

  const getComponent = () => {
    if (cardData?.mediaType?.includes('video')) {
      return (
        <CustomVideo
          classname={styles.media}
          compData={{
            mediaType: 'video',
            videoSource: cardData?.videoSource,
            videoSourceMobile: cardData?.videoSourceMobile,
            videoSourceTablet: cardData?.videoSourceTablet,
            videoSourceOgg: cardData?.videoSourceOgg,
            videoSourceMobileOgg: cardData?.videoSourceMobileOgg,
            videoSourceTabletOgg: cardData?.videoSourceTabletOgg,
            defaultVideoSource: cardData?.defaultVideoSource,
            defaultVideoSourceMobile: cardData?.defaultVideoSourceMobile,
            defaultVideoSourceTablet: cardData?.defaultVideoSourceTablet,
            defaultVideoSourceOgg: cardData?.defaultVideoSourceOgg,
            defaultVideoSourceMobileOgg: cardData?.defaultVideoSourceMobileOgg,
            defaultVideoSourceTabletOgg: cardData?.defaultVideoSourceTabletOgg,
            autoplay: cardData?.autoplayVideo,
            playText: cardData?.playText,
            posterImage: cardData?.posterImage,
            uploadDate: cardData?.uploadDate,
            seoDescription: cardData?.seoDescription,
            seoName: cardData?.seoName,
          }}
        />
      );
    } else {
      return (
        cardData?.imageSource && (
          <CustomImage
            className={styles.media}
            src={{
              mobileSource: cardData?.imageSourceMobile,
              tabletSource: cardData?.imageSourceTablet,
              defaultSource: cardData?.imageSource || '',
            }}
            alt={cardData?.imageAlt}
            loader="false"
          />
        )
      );
    }
  };

  return <div className={styles.mediaSection}>{getComponent()}</div>;
};

export default MediaCard;
