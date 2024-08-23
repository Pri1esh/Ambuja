import { ENDPOINT } from '@api-manager';
import { AboutSection, CostCalculator, ErrorFallback, HeroBanner, Layout, ProductsCard } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.costCalculatorPage);
  const { data } = apiData;
  return getMetadata(data?.seoData?.fields, data?.main?.mainBanner?.fields?.imageSourceMobile);
}

const CostCalculatorPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.costCalculatorPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { mainBanner, costCalculator, iCanCards, aboutPage, breadCrumbList } = main;

  return (
    <Layout
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
    >
      {mainBanner?.fields && (
        <HeroBanner compData={mainBanner?.fields} breadCrumbList={breadCrumbList.fields} noMargin={true} />
      )}
      {costCalculator?.fields && <CostCalculator compData={costCalculator?.fields} />}
      {iCanCards?.fields && <ProductsCard compData={iCanCards?.fields} />}
      {aboutPage?.fields && (
        <div className="container">
          <AboutSection compData={aboutPage?.fields} />
        </div>
      )}
    </Layout>
  );
};

export default CostCalculatorPage;
