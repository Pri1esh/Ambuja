import { ENDPOINT } from '@api-manager';
import { CardList, ErrorFallback, HeroBanner, Layout, Overview, SideNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from '../homeBuilder.module.scss';
export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.homeConstructionBudget);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}
const HomeConstructionBudgetPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.homeConstructionBudget);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }
  const { header, footer, main } = data;
  const { mainBanner, subNav, overview, breadCrumbList, CardList: cardListData, seoData } = main;
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
            {overview?.fields && <Overview compData={overview?.fields} showHeading={true} isMargin={false} />}
            {cardListData?.fields && <CardList compData={cardListData?.fields} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeConstructionBudgetPage;
