import { ENDPOINT } from '@api-manager';
import { CardList, ErrorFallback, HeroBanner, Layout, SubNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.planningAndHomeDesign);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const PlaningAndHomeDesign = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.planningAndHomeDesign);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { header, main, footer } = data;
  const { seoData, mainBanner, breadCrumbList, subNav, CardList: cardListData, overview } = main;

  return (
    <Layout
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
    >
      <div className="d-none d-lg-block">
        {mainBanner?.fields && (
          <HeroBanner compData={mainBanner?.fields} breadCrumbList={breadCrumbList?.fields} noMargin={true} />
        )}
      </div>
      {subNav?.fields?.subNavItems?.length > 0 && (
        <SubNav
          compData={subNav?.fields?.subNavItems}
          heading={subNav?.fields?.heading}
          offcanvasHeading={subNav?.fields?.offcanvasHeading}
          isMobileDropdown={true}
        />
      )}
      <div className="container">
        {cardListData?.fields && <CardList overview={overview?.fields} compData={cardListData?.fields} />}
      </div>
    </Layout>
  );
};

export default PlaningAndHomeDesign;
