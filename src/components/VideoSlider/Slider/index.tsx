import { BaseSlider, CustomImage, CustomLink, CustomVideo } from '@components';
import { ICardSliderData, ISliderCardData } from '@interfaces';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

import { GTMHelper } from '@utils';
import styles from './slider.module.scss';
import playBtn from '../../../assets/icons/playCircle.svg';

const Slider = (item: ICardSliderData) => {
  const { cardDetails } = item;
  const preFix = process.env.NEXT_PUBLIC_STAGING_LINK;

  const sliderCard = (item: ISliderCardData) => {
    return (
      <div className={styles.item}>
        <div className={styles.textContainer}>
          {item?.description && <p className={styles.description}>{item?.description}</p>}
          <div className={styles.author}>
            {item?.heading && <h3>{item?.heading}</h3>}
            {item?.date && <p>{item?.date}</p>}
          </div>
        </div>
      </div>
    );
  };

  const TestVideoCard = (item: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePlayButtonClick = useCallback(() => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    }, [isPlaying]);

    const handleVideoPlay = useCallback(() => {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.controls = true;
      }
    }, []);

    const handleVideoPause = useCallback(() => {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.controls = false;
      }
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }, []);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleClickOutside]);

    return (
      <div className={styles.VideoTest} ref={containerRef}>
        <div className={styles.VideoTestBox}>
          <video
            ref={videoRef}
            controls={false}
            poster={preFix + "/-/media/Project/Ambuja/Areas-Of-Application/Ambuja-Cement/Desktop/Beams-and-Columns---.ashx"}
            className="video-player"
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            playsInline
            itemProp="video"
          >
            <source src={"https://cdn.pixabay.com/video/2019/06/25/24718-345209742_large.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <Image src={playBtn} className={styles.testplay} onClick={handlePlayButtonClick} alt="play" />
          )}
        </div>
        {item?.heading && <h4 className={styles.title}>{item.heading}</h4>}
        {item?.description && <p className={styles.desc}>{item.description}</p>}
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper} container`}>
      <BaseSlider
        isMobSlider={true}
        settings={{
          dots: false,
          infinite: false,
          speed: 400,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          autoplay: false,
          autoplaySpeed: 2200,
          cssEase: 'linear',
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 2,
                arrows: true,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                arrows: false,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        }}
      >
        <React.Fragment key=".0">
          {cardDetails?.gallery?.map((item: ISliderCardData, key: number) => (
            <div key={`${item?.link + key}`} className={styles.itemWrapper}>
              {item?.link ? (
                <CustomLink
                  variant={'anchor'}
                  href={item?.link}
                  target={item?.linkTarget}
                  onClick={() => {
                    GTMHelper({
                      ...item?.gtmData,
                    });
                  }}
                >
                  {TestVideoCard(item)}
                </CustomLink>
              ) : (
                TestVideoCard(item)
              )}
            </div>
          ))}
        </React.Fragment>
      </BaseSlider>
    </div>
  );
};

export default Slider;
