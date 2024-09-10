import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, ErrorFallback, HomeBuilderCards, Layout,SideNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from './homeBuilder.module.scss';

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
  const { seoData, breadCrumbList, homeBuilderCard, subNav} = main;

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

      <div className="container">
        <div className="row">
        <div className="col-12">
            <a className={styles.heading} href="/home-building-guide">
              <h2>Home Building Guide</h2>
            </a>
          </div>
          <div className="col-lg-4">
            {subNav?.fields?.subNavItems?.length > 0 && (
              <SideNav
                compData={subNav?.fields?.subNavItems}
                heading={subNav?.fields?.heading}
                offcanvasHeading={subNav?.fields?.offcanvasHeading}
                isMobileDropdown={true}
              />
            )}
          </div>
          <div className={`col-lg-8 hbg-Container`}>
          {homeBuilderCard?.fields && <HomeBuilderCards compData={homeBuilderCard?.fields} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeBuildingGuidePage;
