import { ENDPOINT } from '@api-manager';
import {
  AboutSection,
  Achievements,
  CustomVideo,
  ErrorFallback,
  HeroBanner,
  InPageNav,
  Layout,
  RelatedProducts,
  TwoColumnCard,
} from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.aboutUsPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const AboutUsPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.aboutUsPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const {
    mainBanner,
    breadCrumbList,
    infoTabs,
    aboutPage,
    aboutPageHeading,
    Achievements: achievements,
    TwoColumnCard: twoColumbCard,
    VisionMission,
    iCanCards,
    videoBanner,
    messageCard,
    mission,
  } = main;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {mainBanner?.fields && (
        <HeroBanner compData={mainBanner?.fields} breadCrumbList={breadCrumbList.fields} noMargin={true} />
      )}
      {infoTabs?.fields && <InPageNav tabsData={infoTabs?.fields?.items} />}
      <div className="container">
        {aboutPageHeading?.fields && <AboutSection compData={aboutPageHeading?.fields} />}
        {achievements?.fields && <Achievements data={achievements?.fields?.data} />}
      </div>
      {twoColumbCard?.fields && <TwoColumnCard compData={twoColumbCard?.fields} />}
      {VisionMission?.fields && <TwoColumnCard compData={VisionMission?.fields} />}
      {mission?.fields && <TwoColumnCard compData={mission?.fields} />}
      {iCanCards?.fields && <RelatedProducts compData={iCanCards?.fields} />}
      <div className="container">{videoBanner?.fields && <CustomVideo compData={videoBanner?.fields} />}</div>
      {messageCard?.fields && <TwoColumnCard compData={messageCard?.fields} />}
      <div className="container">{aboutPage?.fields && <AboutSection compData={aboutPage?.fields} />}</div>
    </Layout>
  );
};

export default AboutUsPage;
