import { Button, CustomIcon } from '@components';
import { ICustomVideo } from '@interfaces';
import { GTMHelper, setFallBack, useDeviceType } from '@utils';
import cx from 'classnames';
import { useState } from 'react';
import styles from './customVideo.module.scss';

const CustomVideo = (props: ICustomVideo) => {
  const { compData, classname = '' } = props;
  const { isOverlayRequired = true, autoplay = true } = compData;
  const { deviceType } = useDeviceType();

  const [playVideo, setPlayVideo] = useState<boolean>(!isOverlayRequired);

  const handleClick = () => {
    setPlayVideo(true);
    GTMHelper({ ...compData?.gtmVideoStart });
  };

  const fallbackVideoSource = {
    mobileSource: setFallBack(compData?.videoSourceMobile, compData?.defaultVideoSourceMobile) ?? '',
    tabletSource: setFallBack(compData?.videoSourceTablet, compData?.defaultVideoSourceTablet) ?? '',
    defaultSource: setFallBack(compData.videoSource, compData?.defaultVideoSource) ?? '',
    mobileSourceOgg: setFallBack(compData?.videoSourceMobileOgg, compData?.defaultVideoSourceMobileOgg) ?? '',
    tabletSourceOgg: setFallBack(compData?.videoSourceTabletOgg, compData?.defaultVideoSourceTabletOgg) ?? '',
    defaultSourceOgg: setFallBack(compData?.videoSourceOgg, compData?.defaultVideoSourceOgg) ?? '',
  };

  const getVideoSource = () => {
    switch (true) {
      case playVideo && deviceType === 'mobile' && compData?.videoSource !== '':
        return {
          mp4Source: setFallBack(compData?.videoSourceMobile, compData?.videoSource),
          oggSource: setFallBack(compData?.videoSourceMobileOgg, compData?.videoSourceOgg),
        };
      case playVideo && deviceType === 'tablet' && compData?.videoSource !== '':
        return {
          mp4Source: setFallBack(compData?.videoSourceTablet, compData?.videoSource),
          oggSource: setFallBack(compData?.videoSourceTabletOgg, compData?.videoSourceOgg),
        };
      case playVideo && compData?.videoSource !== '':
        return { mp4Source: compData?.videoSource, oggSource: compData?.videoSourceOgg };
      case deviceType === 'mobile' && !!compData?.defaultVideoSource:
        return {
          mp4Source: setFallBack(compData?.defaultVideoSourceMobile, compData?.defaultVideoSource),
          oggSource: setFallBack(compData?.defaultVideoSourceMobileOgg, compData?.defaultVideoSourceOgg),
        };
      case deviceType === 'tablet' && compData?.defaultVideoSource !== '':
        return {
          mp4Source: setFallBack(compData?.defaultVideoSourceTablet, compData?.defaultVideoSource),
          oggSource: setFallBack(compData?.defaultVideoSourceTabletOgg, compData?.defaultVideoSourceOgg),
        };
      case compData?.defaultVideoSource !== '' || compData?.defaultVideoSource !== undefined:
        return { mp4Source: compData?.defaultVideoSource, oggSource: compData?.defaultVideoSourceOgg };
      case deviceType === 'mobile':
        return { mp4Source: fallbackVideoSource?.mobileSource, oggSource: fallbackVideoSource?.mobileSourceOgg };
      case deviceType === 'tablet':
        return { mp4Source: fallbackVideoSource?.tabletSource, oggSource: fallbackVideoSource?.tabletSourceOgg };
      default:
        return { mp4Source: fallbackVideoSource?.defaultSource, oggSource: fallbackVideoSource?.defaultSourceOgg };
    }
  };

  const getVideoType = () => {
    switch (true) {
      case compData?.mediaType?.includes('video') &&
        compData?.videoSource !== '' &&
        compData?.defaultVideoSource !== '' &&
        autoplay:
        return (
          <video
            autoPlay={autoplay || playVideo}
            muted
            loop={true}
            playsInline
            controls={isOverlayRequired && playVideo}
            itemProp="video"
          >
            <source src={getVideoSource()?.mp4Source} type="video/mp4" />
            <source src={getVideoSource()?.oggSource} type="video/ogg" />
          </video>
        );
      case compData?.mediaType?.includes('video') &&
        (compData?.videoSource !== '' || compData?.defaultVideoSource !== '') &&
        compData?.posterImage !== '':
        return (
          <video
            autoPlay={autoplay || playVideo}
            muted
            loop={true}
            poster={'https://sitecorecm.uat.adanirealty.com/' + compData?.posterImage}
            playsInline
            controls={isOverlayRequired && playVideo}
            itemProp="video"
          >
            <source src={getVideoSource()?.mp4Source} type="video/mp4" />
            <source src={getVideoSource()?.oggSource} type="video/ogg" />
          </video>
        );
      case compData?.mediaType?.includes('youtube'):
        return (
          <div className={styles.iframeContainer} itemProp="video">
            <iframe title="myFrame" src={playVideo ? compData?.videoSource : compData?.defaultVideoSource} />
          </div>
        );
      case compData?.mediaType?.includes('video') && fallbackVideoSource?.defaultSource !== '':
        return (
          <video autoPlay={autoplay} muted loop={true} playsInline controls={isOverlayRequired} itemProp="video">
            <source src={getVideoSource()?.mp4Source} type="video/mp4" />
            <source src={getVideoSource()?.oggSource} type="video/ogg" />
          </video>
        );

      default:
        return <></>;
    }
  };
  return (
    <section
      className={cx(styles.mediaSection, classname)}
      id={compData?.sectionID}
      itemScope
      itemType="https://schema.org/VideoObject"
    >
      {compData?.heading && <div className={styles.heading}>{compData?.heading}</div>}
      <div className={styles.defaultSection} key={playVideo?.toString()}>
        {getVideoType()}
        {isOverlayRequired && !compData?.mediaType?.includes('youtube') && (
          <div className={`${styles.overlay} ${playVideo ? 'd-none' : ''}`}>
            <div className={styles.playButton}>
              <Button ariaLabel="play" id="play" onClick={handleClick} variant="transparent">
                <CustomIcon iconName={'triangle'} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <meta itemProp="uploadDate" content={compData?.uploadDate} />
      <meta itemProp="thumbnailUrl" content={setFallBack(compData?.posterImage, compData?.videoSource)} />
      <meta itemProp="description" content={compData?.seoDescription} />
      <meta itemProp="name" content={compData?.seoName} />
      <meta itemProp="contentUrl" content={setFallBack(compData?.videoSource, compData?.defaultVideoSource)} />
      <meta itemProp="duration" content={compData?.gtmVideoStart?.video_duration ?? ''} />
    </section>
  );
};

export default CustomVideo;
