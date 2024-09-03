import { ENDPOINT } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, HBGColumnCard, SideNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from '../homeBuilder.module.scss';

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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className={styles.heading}>Home Building Guide</h2>
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
            {TwoColumnCardData?.fields && <HBGColumnCard compData={TwoColumnCardData?.fields} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChoosingTheRightLand;
