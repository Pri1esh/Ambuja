import { ENDPOINT } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, SitemapLinks } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.sitemapPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields, data?.main?.SitemapData?.fields?.bannerSection?.imageSourceMobile);
}

const SitemapPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.sitemapPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { header, main, footer } = data;
  const { seoData, SitemapData, breadCrumbList } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      {SitemapData?.fields?.bannerSection && (
        <HeroBanner
          compData={SitemapData?.fields?.bannerSection}
          breadCrumbList={breadCrumbList?.fields}
          noMargin={true}
        />
      )}
      {SitemapData?.fields?.sitemapLinks && <SitemapLinks compData={SitemapData?.fields?.sitemapLinks} />}
    </Layout>
  );
};

export default SitemapPage;
