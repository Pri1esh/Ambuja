import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, ErrorFallback, HomeBuilderCards, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.homeBuildingGuide);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const HomeBuildingGuidePage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.homeBuildingGuide);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { seoData, breadCrumbList, homeBuilderCard } = main;

  return (
    <Layout
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      {breadCrumbList?.fields?.items?.length > 0 && (
        <div className="container">
          <Breadcrumbs list={breadCrumbList?.fields?.items} />
        </div>
      )}
      {homeBuilderCard?.fields && <HomeBuilderCards compData={homeBuilderCard?.fields} />}
    </Layout>
  );
};

export default HomeBuildingGuidePage;
