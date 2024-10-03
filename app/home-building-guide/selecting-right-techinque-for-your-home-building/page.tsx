import { ENDPOINT } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, SideNav, VideoCard } from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from '../homeBuilder.module.scss';

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
      {mainBanner?.fields && (
        <div className="d-none d-lg-block">
          <HeroBanner compData={mainBanner?.fields} noMargin={true} breadCrumbList={breadCrumbList?.fields} />
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <a className={styles.heading} href="/home-building-guide">
              <h2>Home Building Guide</h2>
            </a>
          </div>
          <div className="col-lg-4 col-xl-3">
            {subNav?.fields?.subNavItems?.length > 0 && (
              <SideNav
                compData={subNav?.fields?.subNavItems}
                heading={subNav?.fields?.heading}
                offcanvasHeading={subNav?.fields?.offcanvasHeading}
                isMobileDropdown={true}
              />
            )}
          </div>
          <div className={`col-lg-8 col-xl-9 hbg-Container`}>
            {selectingTechData?.fields?.selectingTech && (
              <div className="container">
                <VideoCard compData={selectingTechData?.fields?.selectingTech} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeBuildingGuidePage;
