import { BackToTop, Footer, Header } from '@components';
import { ILayoutProps } from '@interfaces';
import { buildVersioinWarning, useDeviceType } from '@utils';
import StickyMobileMenu from '../StickyMobileMenu';

declare const __VERSION__: string, __GIT_VERSION__: string, __BUILD_TIME__: number;
buildVersioinWarning(__VERSION__, __GIT_VERSION__, __BUILD_TIME__);

const Layout = (props: ILayoutProps) => {
  const {
    children,
    headerData,
    footerData,
    seoData,
    className = '',
    isHomePage,
    headerAbsolute = false,
    navBarType,
    defaultActiveTab,
    showHeader = true,
  } = props;

  const { deviceType } = useDeviceType();

  return (
    <main className={className}>
      <script
        id="schemaData"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Organization',
            name: seoData?.orgSchema?.name ?? 'Ambuja Help',
            url: seoData?.orgSchema?.url ?? 'https://www.ambujahelp.in/',
            logo: seoData?.orgSchema?.logo ?? '',
            address: {
              '@type': 'PostalAddress',
              streetAddress: seoData?.orgSchema?.streetAddress ?? '',
              addressRegion: seoData?.orgSchema?.addressRegion ?? 'IN',
              postalCode: seoData?.orgSchema?.postalCode ?? '',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: seoData?.orgSchema?.telephone ?? '',
              contactType: seoData?.orgSchema?.contactType ?? 'customer service',
              areaServed: seoData?.orgSchema?.areaServed ?? 'India',
            },
            sameAs: seoData?.orgSchema?.sameAs ?? [''],
          }),
        }}
      />
      {headerData && showHeader && (
        <Header
          defaultActive={defaultActiveTab}
          isHomePage={isHomePage}
          compData={headerData}
          isAbsolute={headerAbsolute}
          navBarType={navBarType}
        />
      )}
      {children}
      {footerData?.footerData && <Footer compData={footerData?.footerData} isHomePage={isHomePage} />}
      {deviceType === 'desktop' && <BackToTop />}
      {deviceType !== 'desktop' && navBarType !== 'productDetail' && (
        <StickyMobileMenu defaultActive={defaultActiveTab} compData={footerData} />
      )}
    </main>
  );
};

export default Layout;
