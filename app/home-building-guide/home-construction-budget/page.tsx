import { ENDPOINT } from '@api-manager';
import { CardList, ErrorFallback, HeroBanner, Layout, Overview, SideNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from "../homeBuilder.module.scss";
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
          <h2 className={styles.heading}>Home Building Guide</h2>
        </div>
        <div className="col-md-4">
          {subNav?.fields?.subNavItems?.length > 0 && (
            <SideNav
              compData={subNav?.fields?.subNavItems}
              heading={subNav?.fields?.heading}
              offcanvasHeading={subNav?.fields?.offcanvasHeading}
              isMobileDropdown={true}
            />
          )}
        </div>
        <div className={`col-md-8 hbg-Container`}>
        {overview?.fields && <Overview compData={overview?.fields} showHeading={false} isMargin={false} />}
        {cardListData?.fields && <CardList compData={cardListData?.fields} />}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomeConstructionBudgetPage;
