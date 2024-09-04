import { ENDPOINT } from '@api-manager';
import {
  CardList,
  ErrorFallback,
  HeroBanner,
  Layout,
  Overview,
  SideNav,
  HBGColumnCard,
  TwoColumnList,
} from '@components';
import { getApiData, getMetadata } from '@utils/server';

import styles from '../homeBuilder.module.scss';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightPeople);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}
const SelectingRightPeople = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightPeople);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const {
    seoData,
    mainBanner,
    breadCrumbList,
    subNav,
    overview,
    CardList: cardListData,
    TwoColumnCard: twoColumnCardData,
    TwoColumnList: twoColumnListData,
  } = main;
  return (
    // <Layout
    //   defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    //   footerData={footer?.footer?.fields}
    //   headerData={header?.header?.fields}
    //   seoData={seoData?.fields}
    // >
    //   <div className="d-none d-lg-block">
    //     {mainBanner?.fields && (
    //       <HeroBanner compData={mainBanner?.fields} breadCrumbList={breadCrumbList?.fields} noMargin={true} />
    //     )}
    //   </div>
    //   {subNav?.fields?.subNavItems?.length > 0 && (
    //     <SubNav
    //       compData={subNav?.fields?.subNavItems}
    //       heading={subNav?.fields?.heading}
    //       offcanvasHeading={subNav?.fields?.offcanvasHeading}
    //       isMobileDropdown={true}
    //     />
    //   )}
    //   <div className="container">
    //     {overview?.fields && <Overview compData={overview?.fields} showHeading={true} />}
    //     {twoColumnListData?.fields && <TwoColumnList compData={twoColumnListData?.fields} extraMargin={false} />}
    //     {cardListData?.fields && <CardList compData={cardListData?.fields} />}
    //   </div>
    //   {twoColumnCardData?.fields && <TwoColumnCard compData={twoColumnCardData?.fields} />}
    // </Layout>

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
            {overview?.fields && <Overview compData={overview?.fields} showHeading={true} />}
            {twoColumnListData?.fields && <TwoColumnList compData={twoColumnListData?.fields} extraMargin={false} />}
            {cardListData?.fields && <CardList compData={cardListData?.fields} />}
            {twoColumnCardData?.fields && <HBGColumnCard compData={twoColumnCardData?.fields} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectingRightPeople;
