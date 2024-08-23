import { ENDPOINT } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, SubNav, VideoCard } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightTechnique);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}
const HomeBuildingGuidePage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightTechnique);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }
  const { header, footer, main } = data;
  const { seoData, mainBanner, subNav, breadCrumbList, SelectingTech: selectingTechData } = main;
  return (
    <Layout
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
    >
      <div className="d-none d-lg-block">
        <HeroBanner compData={mainBanner?.fields} noMargin={true} breadCrumbList={breadCrumbList?.fields} />
      </div>
      {subNav?.fields?.subNavItems?.length > 0 && (
        <SubNav
          compData={subNav?.fields?.subNavItems}
          heading={subNav?.fields?.heading}
          offcanvasHeading={subNav?.fields?.offcanvasHeading}
          isMobileDropdown={true}
        />
      )}
      {selectingTechData?.fields?.selectingTech && (
        <div className="container">
          <VideoCard compData={selectingTechData?.fields?.selectingTech} />
        </div>
      )}
    </Layout>
  );
};

export default HomeBuildingGuidePage;
