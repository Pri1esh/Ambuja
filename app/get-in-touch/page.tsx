import { ENDPOINT } from '@api-manager';
import { ErrorFallback, GetInTouchData, HeroBanner, Layout, TwoColumnCard } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.getInTouchPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields, data?.main?.mainBanner?.fields?.imageSourceMobile);
}

const GetInTouchPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.getInTouchPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }
  const { header, footer, main } = data;
  const {
    breadCrumbList,
    mainBanner,
    GetInTouchData: GetInTouchDetail,
    TwoColumnCard: TwoColumnCardData,
    seoData,
  } = main;

  return (
    <Layout
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      headerAbsolute={false}
    >
      {mainBanner?.fields && (
        <HeroBanner compData={mainBanner?.fields} breadCrumbList={breadCrumbList?.fields} noMargin={true} />
      )}
      <div className="container">
        <GetInTouchData compData={GetInTouchDetail?.fields} />
      </div>
      {TwoColumnCardData?.fields && <TwoColumnCard compData={TwoColumnCardData?.fields} />}
    </Layout>
  );
};

export default GetInTouchPage;
