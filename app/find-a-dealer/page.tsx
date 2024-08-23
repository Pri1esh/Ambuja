import { ENDPOINT } from '@api-manager';
import { ErrorFallback, Layout, LocatorBannerWrapper, RelatedProducts } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.dealerLocatorPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields, data?.main?.mainBanner?.fields?.imageSourceMobile);
}

const FindADealerPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.dealerLocatorPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }
  const { header, footer, main } = data;
  const { mainBanner, dealerLocatorData, howWorks, breadCrumbList } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      <LocatorBannerWrapper
        compData={mainBanner?.fields}
        dealerLocatorData={dealerLocatorData?.fields}
        breadCrumbList={breadCrumbList.fields}
      />
      <RelatedProducts compData={howWorks?.fields} noMargin={true} />
    </Layout>
  );
};

export default FindADealerPage;
