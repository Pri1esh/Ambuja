'use client';
import { Button, CustomImage, CustomLink } from '@components';
import { IHoverDetails, IProductCard } from '@interfaces';
import { GTMHelper, getIconByName, useDeviceType } from '@utils';
import { useRouter } from 'next/navigation';
import styles from './productItem.module.scss';

const ProductItem = (props: IProductCard) => {
  const {
    heading,
    description,
    imageSource,
    imageAlt,
    badge,
    link,
    linkText,
    hoverDetails,
    gtmData,
    imageSourceMobile,
    imageSourceTablet,
    linkTarget,
  } = props;
  const router = useRouter();
  const { deviceType } = useDeviceType();

  return (
    <div className={`${styles.card} ${badge ? styles.primiumCard : ''}`}>
      {badge && (
        <div className={styles.badge}>
          <span className={styles.icon}>{getIconByName('star')}</span>
          {badge}
        </div>
      )}
      {/* card front */}
      {deviceType === 'mobile' || deviceType === 'tabletVertical' ? (
        <CustomLink
          className={styles.mobileCard}
          href={link}
          target={linkTarget}
          variant=""
          onClick={() => {
            GTMHelper({ ...gtmData });
          }}
        >
          <div className={styles.cardFront}>
            <div className={styles.imgContainer}>
              <CustomImage
                src={{
                  mobileSource: imageSourceMobile,
                  tabletSource: imageSourceTablet,
                  defaultSource: imageSource,
                }}
                loader="false"
                alt={imageAlt}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.title}>{heading}</h2>
              <p className={styles.subTitle}>{description}</p>
            </div>
          </div>
        </CustomLink>
      ) : (
        <div className={styles.cardFront}>
          <div className={styles.imgContainer}>
            <CustomImage
              src={{
                mobileSource: imageSourceMobile,
                tabletSource: imageSourceTablet,
                defaultSource: imageSource,
              }}
              loader="false"
              alt={imageAlt}
            />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{heading}</h2>
            <p className={styles.subTitle}>{description}</p>
          </div>
        </div>
      )}

      {/* card hovered */}
      <div className={styles.hovered}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{heading}</h2>
          <p className={styles.subTitle}>{description}</p>
        </div>
        <div className={styles.iconContainer}>
          {hoverDetails?.map((item: IHoverDetails) => {
            return (
              <div className={styles?.singleIconContainer} key={`${heading + item?.hoverText}`}>
                <CustomImage src={{ defaultSource: item?.hoverImage }} alt={item?.imageAlt} loader="false" />
                <p>{item?.hoverText}</p>
              </div>
            );
          })}
        </div>
        <div className="mx-auto">
          <Button
            className={styles.linkButton}
            onClick={() => {
              if (link) {
                router.push(link);
                GTMHelper({ ...gtmData });
              }
            }}
          >
            {linkText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
