import { ENDPOINT } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, SubNav, TwoColumnCard } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.choosingLand);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const ChoosingTheRightLand = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.choosingLand);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { seoData, mainBanner, subNav, breadCrumbList, TwoColumnCard: TwoColumnCardData } = main;

  return (
    <Layout
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
    >
      {mainBanner?.fields && (
        <div className="d-none d-lg-block">
          <HeroBanner compData={mainBanner?.fields} noMargin={true} breadCrumbList={breadCrumbList?.fields} />
        </div>
      )}
      {subNav?.fields?.subNavItems?.length > 0 && (
        <SubNav
          compData={subNav?.fields?.subNavItems}
          heading={subNav?.fields?.heading}
          offcanvasHeading={subNav?.fields?.offcanvasHeading}
          isMobileDropdown={true}
        />
      )}
      {TwoColumnCardData?.fields && <TwoColumnCard compData={TwoColumnCardData?.fields} />}
    </Layout>
  );
};

export default ChoosingTheRightLand;
