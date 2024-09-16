import { ENDPOINT } from '@api-manager';
import { CardList, ErrorFallback, HeroBanner, Layout, SideNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from '../homeBuilder.module.scss';

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
            {cardListData?.fields && <CardList overview={overview?.fields} compData={cardListData?.fields} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaningAndHomeDesign;
