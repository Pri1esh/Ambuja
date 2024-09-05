import { CustomIcon, CustomImage, CustomLink } from '@components';
import { ICardItem } from '@interfaces';
import { GTMHelper } from '@utils';
import styles from './cardItem.module.scss';

import Image from "next/image"

import homeic from "../../../assets/temp/home.svg"
import rightarrow from "../../../assets/icons/arrowrighttail.svg"



const CardItem = (props: { compData: ICardItem }) => {
  const { compData } = props;
  return (
    <div className={`${styles.cardItem} col-lg-4 col-md-6`}>
      <div className={styles.imageWrapper}>
        <CustomLink
          href={compData?.link}
          target={compData?.linkTarget}
          onClick={() => {
            GTMHelper({
              ...compData?.gtmData,
            });
          }}
        >
          <CustomImage
            lazy="false"
            src={{
              mobileSource: compData?.imageSourceMobile,
              tabletSource: compData?.imageSourceTablet,
              defaultSource: compData?.imageSource,
            }}
            loader="false"
            alt={compData?.imageAlt}
          />
        </CustomLink>
      </div>
      <div className={styles.textContainer}>
      {compData?.heading && <CustomImage
           className={styles.cardIco}
            lazy="false"
            src={{
              mobileSource: compData?.imageSourceMobile,
              tabletSource: compData?.imageSourceTablet,
              defaultSource: compData?.imageSource,
            }}
            loader="false"
            alt={compData?.imageAlt}
          /> }
        {compData?.heading && <h3>{compData?.heading}</h3>}
        {compData?.description && <p className={styles.description}>{compData?.description}</p>}
        {compData?.link && (
          <CustomLink
          href={compData?.link}
          target={compData?.linkTarget}
          variant="underline"
          onClick={() => {
            GTMHelper({
              ...compData?.gtmData,
            });
          }}
        >
          <button className='rounded-pill d-flex align-items-center'>
            
            {compData?.linkText}
            <Image className={styles.cardArrow} src={rightarrow} alt='->'/>
          </button>
          </CustomLink>

        )}
      </div>
    </div>
  );
};

export default CardItem;
