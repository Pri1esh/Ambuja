import { ENDPOINT } from '@api-manager';
import { ErrorFallback, FaqsPageContent, HeroBanner, Layout, TwoColumnCard } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.faqsPage);
  const { data } = apiData;
  return getMetadata(data?.seoData?.fields, data?.main?.mainBanner?.fields?.imageSourceMobile);
}

const FAQsPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.faqsPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { header, main, footer } = data;
  const { mainBanner, breadCrumbList, FAQs, TwoColumnCard: TwoColumnCardData, seoData } = main;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      {mainBanner?.fields && (
        <HeroBanner compData={mainBanner?.fields} noMargin={true} breadCrumbList={breadCrumbList?.fields} />
      )}
      {FAQs?.fields && <FaqsPageContent faqs={FAQs?.fields} />}
      {TwoColumnCardData?.fields && <TwoColumnCard compData={TwoColumnCardData?.fields} />}
    </Layout>
  );
};

export default FAQsPage;
