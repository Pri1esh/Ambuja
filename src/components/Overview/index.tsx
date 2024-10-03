'use client';
import { CustomIcon, CustomImage, CustomLink } from '@components';
import { IOverview } from '@interfaces';
import { useDeviceType } from '@utils';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './overview.module.scss';

const Overview = (props: IOverview) => {
  const textRef = useRef<any>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const { compData, className = '', showHeading = true, isMargin = true } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    heading,
    description,
    imageSource,
    imageSourceMobile,
    imageSourceTablet,
    link,
    linkTarget,
    imageAlt,
    readLess,
    readMore,
    backHeader,
  } = compData;
  const { deviceType } = useDeviceType();
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    if (description && textRef && deviceType !== 'desktop') {
      const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
      const textHeight = textRef.current.offsetHeight;
      const numLines = textHeight / lineHeight;
      setIsEllipsisActive(numLines > 3);
    } else {
      setIsEllipsisActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType]);

  const getHeading = () => {
    if (backHeader) {
      return (
        <div className={styles.headingWrapper}>
          {link && (
            <CustomLink className={styles.backLink} href={link} target={linkTarget} aria-label="arrow">
              <CustomIcon iconName="arrowleft" />
            </CustomLink>
          )}
          <h1>{heading}</h1>
        </div>
      );
    }
    if (heading && showHeading && (deviceType === 'desktop' || deviceType === 'tablet')) {
      return <h1 className={styles.paraHeading}>{heading}</h1>;
    }
    return <></>;
  };

  return (
    <div className={`${cx(styles.wrapper, className, !isMargin ? styles.showHeading : '')} hbg-Overview`}>
      {getHeading()}
      {imageSource && (
        <CustomImage
          className={styles.image}
          src={{
            mobileSource: imageSourceMobile,
            tabletSource: imageSourceTablet,
            defaultSource: imageSource,
          }}
          alt={imageAlt}
        />
      )}
      <div className={`${!imageSource && backHeader ? styles.descriptionWrapper : ''}`}>
        {description && (
          <>
            {deviceType === 'desktop' ? (
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <div className={styles.aboutMobile}>
                <p
                  ref={textRef}
                  className={`${styles.about} ${isEllipsisActive && !isExpanded ? styles.textOverflow : ''}`}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></p>
                {isEllipsisActive && <button onClick={toggleReadMore}>{isExpanded ? readLess : readMore}</button>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
