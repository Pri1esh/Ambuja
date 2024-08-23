import { Button, CustomImage, DealerWrapper, GetInTouchForm } from '@components';
import { IHeroBanner } from '@interfaces';
import { GTMHelper, getIconByName, timeout, useDeviceType } from '@utils';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import CustomLink from '../CustomLink';
import styles from './heroBanner.module.scss';

const HeroBanner = (props: IHeroBanner) => {
  const { compData, noMargin = false, dealerLocatorData, isPDPBanner = false, breadCrumbList } = props;
  const bannerWrapperRef = useRef<HTMLDivElement>(null);
  const { deviceType } = useDeviceType();
  const [show, setShow] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isEnquiryCanvas, setIsEnquiryCanvas] = useState<boolean>(false);
  const [isDealerCanvas, setIsDealerCanvas] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [dynamicHref, setDynamicHref] = useState<string>('');
  const iconsWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPDPBanner) {
      const handleScroll = () => {
        if (
          (typeof window !== 'undefined' && window.scrollY >= 250 && window.innerWidth <= 767) ||
          window.scrollY >= 800
        ) {
          setScrolled(true);
          document.body.classList.add(styles.footerMargin);
        } else {
          setScrolled(false);
          document.body.classList.remove(styles.footerMargin);
        }
      };
      setDynamicHref(window.location.href);

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconsWrapperRef.current && !iconsWrapperRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show]);

  const handleClick = (id: number) => {
    if (id === 0) {
      setIsEnquiryCanvas(true);
      setIsDealerCanvas(false);
    } else if (id === 1) {
      setIsDealerCanvas(true);
      setIsEnquiryCanvas(false);
    }
  };

  const handleCopy = () => {
    navigator?.clipboard
      ?.writeText(window?.location?.href)
      .then(() => {
        setCopied(true);
        timeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  return (
    <section className={styles.bannerWrapper} ref={bannerWrapperRef}>
      {breadCrumbList && breadCrumbList?.items?.length > 0 && (
        <div className="container">
          <Breadcrumbs list={breadCrumbList?.items} className={styles.breadCrumb} theme={breadCrumbList?.theme} />
        </div>
      )}
      <div
        className={`${noMargin ? '' : styles.extraMargin} ${styles.wrapper} ${
          compData?.variant?.includes('large') && styles.large
        }`}
      >
        <div className={styles.item}>
          {compData?.heading &&
            (deviceType === 'desktop' ? (
              <div className="container">
                <div className={styles.desktopHeading}>
                  {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
                  {compData?.subHeading && <p className={styles.subHeading}>{compData?.subHeading}</p>}
                </div>
              </div>
            ) : (
              <div className={styles.contentWrapper}>
                <div className={styles.textWrapper}>
                  {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
                  {compData?.subHeading && <p className={styles.subHeading}>{compData?.subHeading}</p>}
                </div>
              </div>
            ))}
          <div className={styles.imageWrapper}>
            {compData?.imageSource && (
              <CustomImage
                lazy="false"
                src={{
                  mobileSource: compData?.imageSourceMobile,
                  tabletSource: compData?.imageSourceTablet,
                  defaultSource: compData?.imageSource,
                }}
                className={
                  compData?.imageSource || compData?.imageSourceMobile || compData?.imageSourceTablet
                    ? styles.imageZoom
                    : ''
                }
                alt={compData?.imageAlt}
                {...(compData?.imageSource[0] ? { fetchPriority: 'high' } : '')}
              />
            )}
            {compData?.socialIcons && compData?.socialIcons?.length > 0 && (
              <div className={`container ${styles.socialWrapper}`} ref={iconsWrapperRef}>
                <Button
                  className={styles.socialIcons}
                  ariaLabel="social"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {getIconByName(compData?.productData?.itemicon)}
                </Button>
                <div className={`${styles.iconsWrapper} ${show ? 'd-block' : 'd-none'}`}>
                  {compData?.socialIcons?.map((item, index) => (
                    <CustomLink
                      className={styles.anchor}
                      key={`${item?.link + index}`}
                      href={`${item?.link} ${dynamicHref}`}
                      variant={'anchor'}
                      target={item?.linkTarget}
                      onClick={(e: any) => {
                        if (item?.linkText?.toLowerCase()?.includes('copy')) {
                          e?.preventDefault();
                          handleCopy();
                        }
                        GTMHelper({ ...item?.gtmData });
                      }}
                    >
                      {getIconByName(item?.itemicon)}
                      <span>
                        {copied && item?.linkText?.toLowerCase()?.includes('copy') ? 'Copied' : item?.linkText}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            )}
          </div>
          {isPDPBanner ? (
            <div className={styles.detailsBanner}>
              <div className={styles.productImage}>
                {compData?.productData?.imageSource && (
                  <CustomImage
                    lazy="false"
                    src={{
                      mobileSource: compData?.productData?.imageSourceMobile,
                      tabletSource: compData?.productData?.imageSourceTablet,
                      defaultSource: compData?.productData?.imageSource,
                    }}
                    alt={compData?.productData?.imageAlt}
                    loader={'false'}
                  />
                )}
              </div>
              <div className={classNames(styles.details, deviceType === 'mobile' ? 'container' : '')}>
                {compData?.productData?.subHeading && <h2>{compData?.productData?.subHeading}</h2>}
                {compData?.productData?.heading && <h3>{compData?.productData?.heading}</h3>}
                {compData?.productData?.description && <p>{compData?.productData?.description}</p>}

                {deviceType !== 'mobile' && (
                  <div className={styles.buttonGroup}>
                    {compData?.productData?.buttons?.map((item, index) => (
                      <CustomLink
                        key={`buttonGroup__${item?.link + index}`}
                        href={item?.link}
                        variant={index === 0 ? 'brandcolor' : 'lightbordered'}
                        target={item?.linkTarget}
                        className={styles.btn}
                        onClick={(e: any) => {
                          e?.preventDefault();
                          handleClick(index);
                          GTMHelper({ ...item?.gtmData });
                        }}
                      >
                        {item?.linkText}
                      </CustomLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {scrolled && isPDPBanner && (
        <div className={styles.footerButtons}>
          <div className="container">
            {compData?.productData?.heading && deviceType !== 'mobile' && <h3>{compData?.productData?.heading}</h3>}
            <div className={styles.buttonGroup}>
              {compData?.productData?.buttons?.map((item, index) => (
                <CustomLink
                  key={`footerbtn__${item?.link + index}`}
                  href={item?.link}
                  variant={index === 0 ? 'brandcolor' : 'lightbordered'}
                  target={item?.linkTarget}
                  className={styles.btn}
                  onClick={(e: any) => {
                    e?.preventDefault();
                    handleClick(index);
                    GTMHelper({ ...item?.gtmData, product_type: compData?.productData?.heading });
                  }}
                >
                  {item?.linkText}
                </CustomLink>
              ))}
            </div>
          </div>
        </div>
      )}
      {isPDPBanner && (
        <>
          <GetInTouchForm
            isPopup={true}
            setShow={setIsEnquiryCanvas}
            show={isEnquiryCanvas}
            productType={compData?.productData?.heading || ''}
          />
          {isDealerCanvas && dealerLocatorData && (
            <DealerWrapper
              compData={dealerLocatorData}
              showOffcanvas={isDealerCanvas}
              setShowOffcanvas={setIsDealerCanvas}
              inPage={true}
            />
          )}
        </>
      )}
    </section>
  );
};

export default HeroBanner;
