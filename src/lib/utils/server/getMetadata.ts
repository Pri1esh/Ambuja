import { SEO_DATA } from '@enum';

const getMetadata = (seoData: any, preloadImage?: string) => {
  const {
    baseUrl,
    metaDescription,
    metaKeywords,
    browserTitle,
    ogTitle,
    ogImage,
    ogDescription,
    ogUrl,
    canonicalUrl,
    googleSiteVerification,
    robotsTags,
  } = seoData || {};

  return {
    metadataBase: new URL(baseUrl || SEO_DATA.BASEURL),
    title: browserTitle || SEO_DATA.TITLE,
    description: metaDescription || SEO_DATA.TITLE,
    keywords: metaKeywords,
    openGraph: {
      title: ogTitle || '',
      images: [{ url: ogImage, width: 100, height: 100 }],
      description: ogDescription || '',
      url: ogUrl || '',
    },
    robots: {
      index: robotsTags?.index ?? true,
      follow: robotsTags?.follow ?? true,
      nocache: false,
      googleBot: {
        index: robotsTags?.index ?? true,
        follow: robotsTags?.follow ?? true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: googleSiteVerification,
    },
    alternates: {
      canonical: canonicalUrl || '',
    },
    icons: {
      icon: [
        { url: `/assets/images/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
        { url: `/assets/images/favicon-16x16.png`, sizes: '32x32', type: 'image/png' },
      ],
      ...(preloadImage
        ? {
            other: {
              rel: 'preload',
              url: process.env.NEXT_PUBLIC_STAGING_LINK + preloadImage,
              as: 'image',
            },
          }
        : {}),
    },
  };
};

export default getMetadata;
