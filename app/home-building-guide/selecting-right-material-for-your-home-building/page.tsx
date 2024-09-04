import { ENDPOINT } from '@api-manager';
import { CardList, ErrorFallback, HeroBanner, Layout, Overview, SideNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';
import styles from '../homeBuilder.module.scss';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightMaterial);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const SelectingMaterialPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightMaterial);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { seoData, mainBanner, breadCrumbList, subNav, overview, CardList: cardList } = main;
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
            {overview?.fields && <Overview compData={overview?.fields} showHeading={true} isMargin={false} />}
            {cardList?.fields && <CardList compData={cardList?.fields} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectingMaterialPage;
